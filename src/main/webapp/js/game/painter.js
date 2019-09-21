/*
 * @author Zihao Zheng
 * Painter is use to draw chess board
 */

class Painter{

    canvas = $("#canvas_cb")[0];
    cell_w = this.canvas.width / 10;
    cell_h = this.canvas.height / 10;
    trangle_h = this.cell_h * Math.sin(Math.PI/3);
    

    constructor(game){
        this.game = game;
    }

    draw(){
        this.clean();
        this.drawBoard();
        this.darwAllPiece();
        this.drawHighLight();
        this.drawMovePath();
    }

    /*
     * Clean canvas
     */

    clean(){
        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /*
     * Draw ChessBoard
     */
    drawBoard(){
        let context = this.canvas.getContext("2d");
        context.save();
        context.fillStyle= "#D3AA45";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.restore();

        //draw horizontal line
        context.save();
        context.strokeStyle = "black";
        context.lineWidth = "2";
        for (let h = 0; h <= this.canvas.width; h+= this.cell_w){
            context.beginPath();
            context.moveTo(0, h);
            context.lineTo(this.canvas.width, h);
            context.closePath();
            context.stroke();
        }
        //draw vertical line
        for (let v = 0; v <= this.canvas.height; v+= this.cell_w){
            context.beginPath();
            context.moveTo(v, 0);
            context.lineTo(v, this.canvas.height);
            context.closePath();
            context.stroke();
        }
        context.restore();

        //water
        context.save();
        context.fillStyle= "#00DCFF";
        context.fillRect(2 * this.cell_w + 1, 4 * this.cell_h + 1, this.cell_w * 2 - 2, this.cell_h * 2 - 2);
        context.fillRect(6 * this.cell_w + 1, 4 * this.cell_h + 1, this.cell_w * 2 - 2, this.cell_h * 2 - 2);
        context.restore();
    }

    /*
     * Draw all Pieces
     */
    darwAllPiece(){
        let cbd = this.game.chessBoardData;
        //draw all chess pieces
        for (let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                if(cbd[y][x] != null && cbd[y][x] != undefined && cbd[y][x] != "water"){
                    this.drawPiece(cbd[y][x]);
                }
            }
        }
    }
    /*
     * Draw a single Piece
     */
    drawPiece(piece){
        let context = this.canvas.getContext("2d");
        let shiftX = this.cell_w * piece.pos.x;
        let shiftY = this.cell_h * piece.pos.y;
        let imageObj = undefined;

        context.save();
        context.lineWidth = "2";
        context.strokeStyle = "black";
        context.beginPath();
        context.rect(shiftX + 5, shiftY + 5, this.cell_w - 10, this.cell_h - 10);
        context.stroke();
        context.closePath();

        let rank = piece.rank;
        let scale = 0.7;
        let imageW = 64 * 0.7, imageH = 64 * 0.7;
        let ssx = (64 - imageW)/ 2, ssy = (64 - imageW)/ 2 - 2;
        let colorW= "", colorB = ""

        if (piece.team == 1){
            colorB = "black"
            colorW = "white"
            imageObj = this.game.imageObjs.get(IMAGE_PATH[0]);
        }else if (piece.team == 2){
            colorB = "white"
            colorW = "black"
            imageObj = this.game.imageObjs.get(IMAGE_PATH[1]);
        }
        context.fillStyle= colorB;
        context.stroke();
        context.fill();

        if (!piece.isHide){
            context.drawImage(imageObj, piece.rank * this.cell_w, 0, this.cell_w, this.cell_h, shiftX + ssx, shiftY + ssy, imageW, imageH)
            context.font="10 Verdana";
            context.fillStyle= colorW;
            rank = rank == 0 ? "B" : (rank == "11" ? "F" : rank);
            context.fillText("RANK " + rank, shiftX + ssx + 5, shiftY + ssy + 45);
        }
        context.restore();
    }

    drawHighLight(){
        for(let i = 1; i < 3; i++){
            if (!this.game["player" + i].isSelect){
                continue
            }
            let context = this.canvas.getContext("2d");
            let shiftX = this.cell_w * this.game["player" + i].selectPos.x;
            let shiftY = this.cell_h * this.game["player" + i].selectPos.y;
            let c = i == 1 ? "red" : "blue";
            context.save();
            context.beginPath();
            context.rect(shiftX + 5, shiftY + 5, this.cell_w - 10, this.cell_h - 10);
            context.strokeStyle = c;
            context.lineWidth = "4";
            context.stroke();
            context.closePath();
            context.restore();
        }
    }

    drawMovePath(){
        for(let i = 1; i < 3; i++){
            let f = this.game["player" + i].lastMove.from;
            let t = this.game["player" + i].lastMove.to;
            let c = i == 1 ? "red" : "blue";
            if (!f.isEqualto(t)){
                if (f.x != t.x){
                    // d = -1 move left, d = 1 move right
                    let index = f.x > t.x ? f.x : t.x;
                    let d = f.x > t.x ? -1 : 1;
                    for ( let i = f.x; i != t.x; i = i + d){
                        if(d < 0){
                            this.drawArror(i, t.y, c,Math.PI * 1.5);
                        }else{
                            this.drawArror(i, t.y, c,Math.PI * 0.5);
                        }
                    }
                }else if (f.y != t.y){
                    // d = -1 move up, d = 1 move dowm
                    let index = f.y > t.y ? f.y : t.y;
                    let d = f.y > t.y ? -1 : 1;
                    for ( let i = f.y; i != t.y; i = i + d){
                        if(d < 0){
                            this.drawArror(t.x, i, c,0);
                        }else{
                            this.drawArror(t.x, i, c, Math.PI);
                        }
                    }
                }
            }
        }
    }

    drawArror(x, y, color ,rotate){
        let centerX = this.cell_w / 2;
        let centerY = this.cell_h / 2;
        let shiftX = this.cell_w * x;
        let shiftY = this.cell_h * y;

        let context = this.canvas.getContext("2d");
        context.save();
        context.strokeStyle = color;
        context.lineWidth = "2";
        context.translate(centerX + shiftX, centerY + shiftY);
        context.rotate(rotate);
        context.translate((centerX + shiftX) * -1, (centerY + shiftY) * -1);
        context.beginPath();
        context.moveTo(centerX + shiftX, shiftY + 5);
        context.lineTo(centerX - 5 + shiftX, shiftY + 15);
        context.lineTo(centerX + shiftX, shiftY + 12);
        context.lineTo(centerX + 5 + shiftX, shiftY + 15);
        context.lineTo(centerX + shiftX, shiftY + 5);
        context.closePath();
        context.stroke();
        context.restore();
    }
}
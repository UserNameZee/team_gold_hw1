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
        //draw horizontal line
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
    }

    /*
     * Draw all Pieces
     */
    darwAllPiece(){
        let cbd = this.game.chessBoardData;
        //draw all chess pieces
        for (let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                if(cbd[y][x] != null || cbd[y][x] != undefined){
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
    }

    drawHighLight(){
        for(let i = 1; i < 3; i++){
            if (!this.game["player" + i].isSelect){
                continue
            }
            let context = this.canvas.getContext("2d");
            let shiftX = this.cell_w * this.game["player" + i].selectPos.x;
            let shiftY = this.cell_h * this.game["player" + i].selectPos.y;

            context.beginPath();
            context.rect(shiftX + 5, shiftY + 5, this.cell_w - 10, this.cell_h - 10);
            context.strokeStyle = "green";
            context.lineWidth = "4";
            context.stroke();
            context.closePath();
        }
    }

    drawMovePath(){
        for(let i = 1; i < 3; i++){
            let f = this.game["player" + i].lastMove.from;
            let t = this.game["player" + i].lastMove.to;
            if (f.isEqualto(t)){
                continue;
            }
            //move top



            if(f.y - t.y < 1){

            }
        }
    }

    drawTrangle(x, y){
        let context = this.canvas.getContext("2d");


    }



}
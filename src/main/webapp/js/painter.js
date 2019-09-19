class Painter{

    canvas = $("#canvas_cb")[0];
    cell_w = this.canvas.width / 10;
    cell_h = this.canvas.height / 10;
    trangle_h = this.cell_h * Math.sin(Math.PI/3);
    

    constructor(game){
        this.game = game;
    }

    draw(){
        this.drawBoard();

        let cbd = this.game.chessBoardData;
        //draw all chess pieces
        for (let y = 0; y < 10; y++){
            for(let x = 0; x < 10; x++){
                if(cbd[y][x] != null || cbd[y][x] != undefined){
                    this.drawPiece(cbd[y][x]);
                }
            }
        };
    }

    clean(){

    }

    drawBoard(){
        let context = this.canvas.getContext("2d");
        //draw horizontal line
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

    drawPiece(piece){
        let shiftX = this.cell_w * piece.pos.x;
        let shiftY = this.cell_h * piece.pos.y;
        let context = this.canvas.getContext("2d");
        if (piece.team == 1){
            context.moveTo(this.cell_w/2 + shiftX, this.trangle_h + shiftY);
            context.lineTo(0 + shiftX, 0 + shiftY);
            context.lineTo(this.cell_w + shiftX,0 + shiftY);
            context.fillStyle='#00ff00'
            context.fill()
        }else if (piece.team == 2){
            context.moveTo(this.cell_w/2 + shiftX, 0 + shiftY) ;
            context.lineTo(0 + shiftX , this.trangle_h + shiftY);
            context.lineTo(this.cell_w + shiftX, this.trangle_h + shiftY);
            context.fillStyle='#00ff00'
            context.fill()
        }
    }

}
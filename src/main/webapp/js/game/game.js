/*
 *@author Zihao Zheng
 */

/*
 * This is where Stratego game start.
 */

IMAGE_PATH = [
    "img/cards_w.png",
    "img/cards_b.png"
]

/*
*   Pre-LoadImage
*/
var ImageObjs = new Map();
var locker = 0;
function preLoadImages() {
    for (let i = 0; i < IMAGE_PATH.length; i++){
        locker ++;
        var imageObj = new Image();
        imageObj.src = IMAGE_PATH[i];
        ImageObjs.set(IMAGE_PATH[i], imageObj);
        imageObj.onload = function () {
            locker--;
            if (locker == 0) {
                new Stratego().init(ImageObjs);

            }
        }
    }
}


 class Stratego {

    init(ImageObjs){
        this.player1 = new Player(1);
        this.player2 = new Player(2);
        this.ai = new AI();

        this.imageObjs = ImageObjs;
        this.canvas = $("#canvas_cb")[0];
        this.chessPieces = new ChessPieces();
        this.chessBoardData = new Array(10);
        this.painter = new Painter(this);


        this.initChessBoardData();
        this.chessPieces.init(this.chessBoardData);
        this.painter.draw();
        this.initMouseEvent();
    };

    initMouseEvent(){
        let cell_w = this.painter.cell_w;
        let cell_h = this.painter.cell_h;
        let chessBoardData = this.chessBoardData;
        let stratego = this;
        this.canvas.onclick = function (e){
            let x = Math.ceil(e.clientX/cell_w) - 1, y = Math.ceil(e.clientY/cell_h) - 1;
            //Highlight chess piece When player2 click on his/her chess piece.
            if (chessBoardData[y][x] != null && chessBoardData[y][x].team == 2){
                stratego.player2.isSelect = true;
                stratego.player2.selectPos.setXY(x, y)
                stratego.player2.selectPiece = chessBoardData[y][x];
            }
            //Move chess piece
            if((chessBoardData[y][x] == null || chessBoardData[y][x].team == 1) && stratego.player2.isSelect == true){
                stratego.moveChessPiece(stratego.player2, x, y);
            }

            stratego.painter.draw();
            console.log(chessBoardData[y][x]);
        }
    }

    initChessBoardData(){
        for (let y = 0; y < 10; y++){
            this.chessBoardData[y] = new Array(10);
        };
    };

    moveChessPiece(player, x, y){
        let sPiece = player.selectPiece;
        if (sPiece.pos.x != x && sPiece.pos.y != y){
            return "Invalid Move";
        }
        switch(sPiece.rank){
            case 0:
                return "Invalid Move";
                break;
            case 2:
                if (sPiece.pos.x != x){
                    let index = sPiece.pos.x > x ? sPiece.pos.x : x;
                    let d = sPiece.pos.x > x ? -1 : 1;
                    for ( let i = sPiece.pos.x + d; i != x; i = i + d){
                        if(this.chessBoardData[y][i] != null) return "Invalid Move";
                    }
                }else if (sPiece.pos.y != y){
                    let index = sPiece.pos.y > y ? sPiece.pos.y : y;
                    let d = sPiece.pos.y > y ? -1 : 1;
                    for ( let i = sPiece.pos.y + d; i != y; i = i + d){
                        if(this.chessBoardData[i][x] != null) return "Invalid Move";
                    }
                }
                break;
            case 11:
                return "Invalid Move";
                break;
            default:
                if (Math.abs(sPiece.pos.x - x ) > 1 || Math.abs(sPiece.pos.y - y ) > 1){
                    return "Invalid Move";
                }
                break;
        }

        player.lastMove.set(sPiece.pos, new Point(x, y));

        if (this.chessBoardData[y][x] != null){
            let result = sPiece.attack(this.chessBoardData[y][x]);
            switch (result) {
                case "KILL":
                    this.chessPieces.removePiece(this.chessBoardData, this.chessBoardData[y][x])
                    break;
                case "KILLED":
                    this.chessPieces.removePiece(this.chessBoardData, sPiece)
                    break;
                case "WIN":
                    this.chessPieces.removePiece(this.chessBoardData, this.chessBoardData[y][x])
                    if (sPiece.team == 2 ){
                        console.log("You Win");
                    }else{
                        console.log("You lose");
                    }
                    break;
                default:
                    this.chessPieces.removePiece(this.chessBoardData, this.chessBoardData[y][x]);
                    this.chessPieces.removePiece(this.chessBoardData, sPiece);
                    this["player" + sPiece.team].deSelect();
                    return;
                    break;
            }
        }

        if(this.chessBoardData[y][x] == null){
            this.chessBoardData[sPiece.pos.y][sPiece.pos.x] = null;
            this.chessBoardData[y][x] = sPiece;
            player.selectPiece.pos.setXY(x, y);
            player.selectPos.setXY(x, y);
        }
        return ""
    }
}

 var Game ={
    start : function (){
        preLoadImages();
    }
 }



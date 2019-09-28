/*
 *@author Zihao Zheng
 */

/*
 * This is where Stratego game start.
 */

IMAGE_PATH = [
    "/img/cards_w.png",
    "/img/cards_b.png"
]

/*
*   Pre-LoadImage
*/
var ImageObjs = new Map();
var locker = 0;
function preLoad(stratego, btnSetup) {
    for (let i = 0; i < IMAGE_PATH.length; i++){
        locker ++;
        var imageObj = new Image();
        imageObj.src = IMAGE_PATH[i];
        ImageObjs.set(IMAGE_PATH[i], imageObj);
        imageObj.onload = function () {
            locker--;
            if (locker == 0) {
                stratego.init(ImageObjs);
            }
        }
    }
}

 class Stratego {

    init(ImageObjs){
        this.player1 = new Player(1);
        this.player1.isTurn = false;
        this.player2 = new Player(2);
        this.player2.isTurn = true;
        this.ai = new AI(this);

        this.imageObjs = ImageObjs;
        this.canvas = $("#canvas_cb")[0];
        this.chessPieces = new ChessPieces();
        this.chessBoardData = new Array(10);
        this.painter = new Painter(this);


        this.initChessBoardData();
        this.painter.draw();
        this.initButton();
    };


    initButton(){
        let stratego = this;
        let chessBoardData = this.chessBoardData;
        let cell_w = this.painter.cell_w, cell_h = this.painter.cell_h;;
        $("#setup").prop("disabled", false);
        //select function
        let select = function (x, y) {
            if (chessBoardData[y][x] !== undefined && chessBoardData[y][x].team == 2){
                stratego.player2.isSelect = true;
                stratego.player2.lastSelectPos.assign(stratego.player2.selectPos);
                stratego.player2.lastSelectPiece = stratego.player2.selectPiece;
                stratego.player2.selectPos.setXY(x, y);
                stratego.player2.selectPiece = chessBoardData[y][x];
            }
        }
        /*
        * setup: random the pieces on board, and allow player to switch piece
        * but not allow player to move piece
        */
        $("#setup").on("click", function (){
            $("#start").prop("disabled", false);
            stratego.chessPieces.init(chessBoardData);
            stratego.painter.draw();
            $("#canvas_cb").on('click', function (e){
                let x = Math.ceil(e.offsetX/cell_w) - 1, y = Math.ceil(e.offsetY/cell_h) - 1;
                select(x, y);
                if (stratego.player2.lastSelectPiece != undefined){
                    stratego.switchPiece(stratego.player2.lastSelectPiece, stratego.player2.selectPiece);
                    stratego.player2.deSelect();
                }
                stratego.painter.draw();
            })
        });

        $("#start").on("click", function() {
            $("#setup").prop("disabled", true);
            $("#canvas_cb").off("click");
            $("#canvas_cb").on("click", function (e) {
                let x = Math.ceil(e.offsetX / cell_w) - 1, y = Math.ceil(e.offsetY / cell_h) - 1;
                if (chessBoardData[y][x] !== undefined && chessBoardData[y][x].team == 2) {
                    select(x, y);
                }
                if (stratego.player2.isTurn && (chessBoardData[y][x] === undefined || chessBoardData[y][x].team == 1) && stratego.player2.isSelect == true) {
                    let result = stratego.moveChessPiece(stratego.player2, x, y);
                    if (result == "TURN_END"){
                        stratego.switchTurn();
                        stratego.ai.aiMove();
                    }
                }
                stratego.painter.draw();
                console.log(chessBoardData[y][x]);
            });
            $("#start").prop("disabled", true);
            $("#surrender").prop("disabled", false);
        });

        $("#surrender").on("click", function (){
            $("#setup").prop("disabled", false);
            $("#surrender").prop("disabled", true);
            //send game data to server
        })
    }

    initChessBoardData(){
        for (let y = 0; y < 10; y++){
            this.chessBoardData[y] = new Array(10);
            for(let x = 0; x < 10; x++){
                this.chessBoardData[y][x] = undefined;
            }
            if(y == 4 || y == 5){
                this.chessBoardData[y][2] = "water"
                this.chessBoardData[y][3] = "water"
                this.chessBoardData[y][6] = "water"
                this.chessBoardData[y][7] = "water"
            }
        };
    };

     switchTurn(){
        if(this.player1.isTurn == true){
            this.player1.isTurn = false;
            this.player2.isTurn = true;
        }else{
            this.player1.isTurn = true;
            this.player2.isTurn = false;
        }
    }

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
                        if(this.chessBoardData[y][i] !== undefined) return "Invalid Move";
                    }
                }else if (sPiece.pos.y != y){
                    let index = sPiece.pos.y > y ? sPiece.pos.y : y;
                    let d = sPiece.pos.y > y ? -1 : 1;
                    for ( let i = sPiece.pos.y + d; i != y; i = i + d){
                        if(this.chessBoardData[i][x] !== undefined) return "Invalid Move";
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

        if (this.chessBoardData[y][x] !== undefined){
            let result = sPiece.attack(this.chessBoardData[y][x]);
            switch (result) {
                case "KILL":
                    this.chessPieces.removePiece(this.chessBoardData, this["player" + this.chessBoardData[y][x].team], this.chessBoardData[y][x])
                    break;
                case "KILLED":
                    this.chessPieces.removePiece(this.chessBoardData, this["player" + sPiece.team], sPiece)
                    break;
                case "WIN":
                    this.chessPieces.removePiece(this.chessBoardData, this["player" + this.chessBoardData[y][x].team], this.chessBoardData[y][x])
                    if (sPiece.team == 2 ){
                        console.log("You Win");
                        return "WIN";
                    }else{
                        console.log("You loss"); this.chessPieces.removePiece(this.chessBoardData, this["player" + this.chessBoardData[y][x].team], this.chessBoardData[y][x])
                        return "LOSS";
                    }
                    break;
                default:
                    this.chessPieces.removePiece(this.chessBoardData, this["player" + this.chessBoardData[y][x].team], this.chessBoardData[y][x])
                    this.chessPieces.removePiece(this.chessBoardData, this["player" + sPiece.team], sPiece)
                    break;
            }
        }
        if(this.chessBoardData[sPiece.pos.y][sPiece.pos.x] !== undefined){
            this.chessBoardData[sPiece.pos.y][sPiece.pos.x] = undefined;
            this.chessBoardData[y][x] = sPiece;
            player.selectPiece.pos.setXY(x, y);
            player.selectPos.setXY(x, y);
        }
        this.switchTurn();
        this.postTurn();
        return "TURN_END";
    }

    switchPiece(piece1, piece2){
        let pos1 = piece1.pos;
        let pos2 = piece2.pos;
        piece1.pos = pos2;
        piece2.pos = pos1;this.chessBoardData[piece1.pos.y][piece1.pos.x] = piece1;
        this.chessBoardData[piece2.pos.y][piece2.pos.x] = piece2;
        return;
    }

    postTurn(playerTurn){
        let board = new Array(100);
        let slots_id = 0;
        for(let y = 0; y < 10; y++){
            for (let x = 0; x < 10; x++){
                if (this.chessBoardData[y][x] !== undefined && this.chessBoardData[y][x] !== "water"){
                    let rank = this.chessBoardData[y][x].rank;
                    let teamid = this.chessBoardData[y][x].team;
                    console.log("piece: " + (teamid * 100 + rank) + " at x: " +  x + ", y: " + y);
                    board[slots_id] = teamid * 100 + rank;
                    slots_id++;
                    console.log(board);
                }
            }
        }
    }
}
 var Game ={
    start : function (){
        var stratego = new Stratego();
        preLoad(stratego);
    }
 }



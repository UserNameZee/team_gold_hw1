class AI{
    constructor(stratego){
        this.stratego = stratego;
    }
    fakeMove(){
        if (!this.stratego.player1.isTurn) return;
        let s = this.stratego
        setTimeout(function (){
            s.switchTurn();
        }, 5000);
        return true;
    }
    aiMove(){
        this.findMovablePieces(this.stratego.chessBoardData,this.stratego.team1)

    }

    /*
    *  GetBoard, get player move
    * */
    GetAIMove(playermove,board){



    }
    makeGuesses(){
        if( this.fakeMove()){
        }
    }

    getAllMove(start,board) {
        let row = start[0];
        let col = start[1];
        let mypieces = board[row][col];
        let myRank = this.stratego.team1;
    }

    /*寻找所有棋子，可移动棋子加入array */
    findMovablePieces(board,AI){
        for (let y = 0 ; y < AI.length; y++){
            let x_length = AI.length[y];
            for(let x = 0 ; x < x_length.length; x++){
                if()
            }
        }
    }



}
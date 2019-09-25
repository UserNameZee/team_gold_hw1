class AI{
    constructor(stratego){
        this.stratego = stratego;
    }
    fakeMove(){
        if (!this.stratego.player1.isTurn) return;
        let s = this.stratego
        setTimeout(function (){
            s.switchTurn();
        }, 1000);
    }
    aiMove(){
        let mov_arr =  this.findMovablePieces(this.stratego.chessBoardData,this.stratego.team1);
        this.makeGuesses(mov_arr,this.stratego.chessBoardData);
    }

    /*
    *  GetBoard, get player move
    * */
    GetAIMove(playermove,board){



    }
    makeGuesses(movableArr,board){
        //  做一个 for loop for movable pieces
        // 每一个 可以移动的棋子检测 周围 的分数
        let minMax= movableArr;
        if (minMax == undefined)
            return  null;
        //calculate all the score in the minmax array
        for (let i  in minMax){
            let temp=this.calScore(i,board)
            i.socre=temp;
        }
        var max=0;
        var result;
        //get max score in the minmax array
        for(let j in minMax){
            if(j.score>max){
                max=j.score;
                result=j;
            }
        }

        return result












    }


    // 保护国旗移动加分。
    // 分数小要逃跑
    // 冲锋： 对面棋子却大分数越高   对棋子分类{
    // 分数/2.5
    // 踩地雷   	  -1
    //
    // 优先级：
    // 1.间谍：8
    // 2.冲锋  1
    // 3.工兵  4     最后一个和对手地雷不小于1变为     7
    //
    // 4    3
    // 5    4
    // 6    5
    // 7    6
    // 8    7
    // 9    8
    // 10司令   10
    // B炸弹    7
    // F国旗    999

    markingThePoint( ){


    }

    getAllMove(start,board) {
        let row = start[0];
        let col = start[1];
        let mypieces = board[row][col];
        let myRank = this.stratego.team1;
    }

    /*寻找所有棋子，可移动棋子加入array */
    findMovablePieces(board,AI){
        let movable_pieces = new Array();
        for (let y = 0 ; y < AI.length; y++){
            let x_length = AI[y].length;
            for(let x = 0 ; x < x_length.length; x++){

                let temp={origin: board[x][y]}
                if(this.movablePieces(board[x-1][y],x-1,y)){
                    temp.left=board[x-1][y];
                }else{
                    temp.left=null ;
                }

                if(this.movablePieces(board[x+1][y],x+1,y)){
                    temp.right=board[x+1][y];
                }else{
                    temp.right=null;
                }

                if(this.movablePieces(board[x][y-1],x,y-1)){
                    temp.above=board[x][y-1];
                }else{
                    temp.above=null;
                }

                if(this.movablePieces(board[x][y+1],x,y+1)){
                    temp.below=board[x][y+1];
                }else{
                    temp.below=null;
                }

                if(temp.above!=null||temp.below!=null||temp.left!=null||temp.right!=null){
                    movable_pieces.append(temp);
                }
            }
        }
        return movable_pieces;
    }


    movablePieces(target,x,y) {
        if (x < 0 && y <0 && x > 9 && y > 9)
            return false;
        if (target == undefined)
            return true;
        else if (target == "water")
            return false;
        else if (target.team == 1)
            return false
        else
            return true;
    }

    calScore(obj,board){
        return 1;
    }




}
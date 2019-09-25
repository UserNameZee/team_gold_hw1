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
        console.log("AI turn starts")
        let mov_arr =  this.findMovablePieces(this.stratego.chessBoardData,this.stratego.team1);
        console.log("movable array"+mov_arr);
        let des = this.makeGuesses(mov_arr,this.stratego.chessBoardData).origin;
        console.log("des"+des);
        let ox=des.pos.x;
        let oy=des.pos.y;
        let go=des.des;
        let dx=ox;
        let dy=oy;
        if(go=="top"){
             dx=ox;
             dy=oy-1;
        }else if(go=="bot"){
             dx=ox;
             dy=oy=1;
        }else if(go=="left"){
             dx=ox-1;
             dy=oy;
        }else{
             dx=ox+1;
             dy=oy;
        }



        this.select(ox,oy);
        this.stratego.moveChessPiece(this.stratego.player1, dx, dy);
        this.stratego.switchTurn();


    }

    select (x, y) {
        let stratego= this.stratego;
        if (stratego.chessBoardData[y][x] != null && stratego.chessBoardData[y][x].team == 1){
            stratego.player1.isSelect = true;
            stratego.player1.lastSelectPos.assign(stratego.player1.selectPos);
            stratego.player1.lastSelectPiece = stratego.player1.selectPiece;
            stratego.player1.selectPos.setXY(x, y);
            stratego.player1.selectPiece =stratego.chessBoardData[y][x];
        }
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
            i.socre=temp.score;
            i.des=temp.des;
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





    randomPieceMove(movableArr,board,AI){
        if (movableArr == undefined)
            return;
        let pieces = Array.from(movableArr);
        let rand_pieces = pieces[Math.floor(Math.random() * pieces.length)];
        if (movableArr[rand_pieces].below != null){
            this.stratego.moveChessPiece(AI,rand_pieces.pos.x,rand_pieces.pos.y-1);
        }
        else if (movableArr[rand_pieces].left != null){
            this.stratego.moveChessPiece(AI,rand_pieces.pos.x-1,rand_pieces.pos.y);
        }
        else if (movableArr[rand_pieces].right != null){
            this.stratego.moveChessPiece(AI,rand_pieces.pos.x+1,rand_pieces.pos.y);
        }
        else{
            this.stratego.moveChessPiece(AI,rand_pieces.pos.x,rand_pieces.pos.y+1);
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

    calScore(target,board){
        let top = new Array();
        let bot = new Array();
        let left = new Array();
        let right= new Array();
        let L_top;
        let R_top;
        let L_bot;
        let R_bot;
        if (target.above != undefined){
            let temp = target.above.pos;
            L_top = board[temp.x-1][temp.y];
            R_top = board[temp.x+1][temp.y];
            top[0] =  this.comparePieces(target,target.above);
            if (this.movablePieces(board[temp.x][temp.y+1],temp.x,temp.y+1)){
                top[1] = this.comparePieces(target,board[temp.x][temp.y+1]);
            }
            else if (this.movablePieces(L_top,L_top.x,L_top.y)){
                top[2] = this.comparePieces(target,L_top);
            }
            else if (this.movablePieces(R_top,R_top.x,R_top.y)){
                top[3] = this.comparePieces(target,R_top);
            }
        }
        else if(target.below != undefined){
            let temp = target.below.pos;
            L_bot = board[temp.x-1][temp.y];
            R_bot = board[temp.x+1][temp.y];
            bot[0] = this.comparePieces(target,target.below);
            if (this.movablePieces(board[temp.x][temp.y-1],temp.x,temp.y-1)){
                bot[1] = this.comparePieces(target,board[temp.x][temp.y-1]);
            }
            else if (this.movablePieces(L_bot,L_bot.x,L_bot.y)){
                bot[2] = this.comparePieces(target,L_bot);
            }
            else if (this.movablePieces(R_bot,R_bot.x,R_bot.y)){
                bot[3] = this.comparePieces(target,R_bot);
            }

        }
        else if (target.left != undefined){
            let temp = target.left.pos;
            if (this.movablePieces(board[temp.x-1][temp.y],temp.x-1,temp.y)){
                left[1] = this.comparePieces(target,board[temp.x-1][temp.y]);
            }
            left[2] = bot[2];
            left[3] = top[2];
        }
        else if (target.right != undefined){
            let temp = target.right.pos;
            if (this.movablePieces(board[temp.x+1][temp.y],temp.x+1,temp.y)){
                right[1] = this.comparePieces(target,board[temp.x+1][temp.y]);
            }
            right[2] = bot[3];
            right[3] = top[3];
        }
        


    }


    comparePieces(att,def) {
        if (att.rank > def.rank)
            return def.rank
        if (att.rank < def.rank)
            return -att.rank;
        else{
            return 0;
        }
    }
}
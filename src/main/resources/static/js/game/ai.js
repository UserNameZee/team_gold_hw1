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
        let mov_arr =  this.findMovablePieces(this.stratego.chessBoardData,this.stratego.chessPieces.team1);
         console.log("find movable array")
         console.log(mov_arr);
        // let result = this.makeGuesses(mov_arr,this.stratego.chessBoardData);
        // console.log(result);
        // let des= result.origin;
        // console.log("des"+des);
        // let ox=des.pos.x;
        //         // let oy=des.pos.y;
        //         // let go=des.des;
        //         // let dx=ox;
        //         // let dy=oy;

        // if(go=="top"){
        //     dx=ox;
        //     dy=oy-1;
        // }else if(go=="bot"){
        //     dx=ox;
        //     dy=oy=1;
        // }else if(go=="left"){
        //     dx=ox-1;
        //     dy=oy;
        // }else{
        //     dx=ox+1;
        //     dy=oy;
        // }





        let ran=Math.floor(Math.random()*mov_arr.length)
        let result=mov_arr[ran]
        console.log(result);
        let ox=result.origin.pos.x;
        let oy=result.origin.pos.y;
        let dx=ox;
        let dy=oy;
        if(result.below!="null"){
            dx=ox;
            dy=oy+1;
        }else if(result.top!="null"){
            dx=ox;
            dy=oy-1;
        }else if(result.left!="null"){
            dx=ox-1;
            dy=oy;
        }else if(result.right!="null"){
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
        console.log("enter make guesses")

        //calculate all the score in the minmax array
        for (let i =0; i<movableArr.length;i++){
            console.log("the element is "+ movableArr[i]);
            let temp=this.calScore(movableArr[i],board);
            console.log("cal Score: "+temp);
            console.log("cal Score temp score: "+temp.score);
            console.log("temp score"+ parseInt(temp.score));
            i.socre=temp.score;
            i.des=temp.des;
        }
        let max=-999;
        let result=movableArr[0];
        //get max score in the minmax array
        for(let j=0;j<movableArr.length;j++){
            if(movableArr[j].score>=max){
                max=movableArr[j].score;
                result=movableArr[j];
            }
        }

        return result;

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

    /*寻找所有棋子，可移动棋子加入array */
    findMovablePieces(board,AI){
        let movable_pieces = new Array();
        for (let y = 0 ; y < 10; y++){
            for(let x = 0 ; x < 10; x++){
                //console.log(y+"--"+x);
                if(board[y][x]!=undefined&&board[y][x]!="water"&&board[y][x].team!=2&&board[y][x].movetype!=0){
                    //console.log("enter if")
                    let temp={origin: board[y][x]}
                    if(y>0){
                        if(this.movablePieces(board[y-1][x],y-1,x)){
                            temp.above=board[y-1][x];
                        }else{
                            temp.above="null" ;
                        }
                    }else{
                        temp.above="null";
                    }

                    if(y<9){
                        //console.log(this.movablePieces(board[y][x+1]));
                        if(this.movablePieces(board[y+1][x],y+1,x)){
                            temp.below=board[y+1][x];
                        }else{
                            temp.below="null";
                        }
                    }else{
                        temp.below="null";
                    }


                    if(x>0){
                        if(this.movablePieces(board[y][x-1],y,x-1)){
                            temp.left=board[y][x-1];
                        }else{
                            temp.left="null";
                        }
                    }else{
                        temp.left="null";
                    }

                    if(x<9){
                        if(this.movablePieces(board[y][x+1],y,x+1)){
                            //console.log("add pieces to the temp now")
                            temp.right=board[y][x+1];
                        }else{
                            temp.right="null";
                        }
                    }else{
                        temp.right="null";
                    }


                    //console.log(temp);
                    //console.log(temp.below);
                    if( temp.above!="null"||temp.below!="null"||temp.left!="null"||temp.right!="null" ){
                        //console.log(" push pieces into movable pieces")
                        movable_pieces.push(temp);
                    }
                }
            }
        }
        return movable_pieces;
    }


    movablePieces(target,x,y) {
        if (x < 0 || y <0 || x > 9 || y > 9){
            return false;
        }

        if (target == undefined){
            return true;
        }else if (target == "water"){
            return false;
        }else if (target.team == 1){
            return false
        }else{
            return true;
        }


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
        if (target.above != "null"){

            let temp = target.above.pos;
            if(temp.x>1){
                L_top = board[temp.x-1][temp.y];
            }else{
                L_top="null";
            }
            if(temp.x<9){
                R_top = board[temp.x+1][temp.y];
            }else{
                R_top="null";
            }



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
        else if(target.below != "null"){
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
        else if (target.left != "null"){
            let temp = target.left.pos;
            if (this.movablePieces(board[temp.x-1][temp.y],temp.x-1,temp.y)){
                left[1] = this.comparePieces(target,board[temp.x-1][temp.y]);
            }
            left[2] = bot[2];
            left[3] = top[2];
        }
        else if (target.right != "null"){
            let temp = target.right.pos;
            if (this.movablePieces(board[temp.x+1][temp.y],temp.x+1,temp.y)){
                right[1] = this.comparePieces(target,board[temp.x+1][temp.y]);
            }
            right[2] = bot[3];
            right[3] = top[3];
        }

        let dic={score: -999, des: "null"}
        if (this.count_sorce(top) > this.count_sorce(bot)){
            if (this.count_sorce(top) > this.count_sorce(left)){
                if (this.count_sorce(top) > this.count_sorce(right)){
                    dic = {socre:this.count_sorce(top),des:"top"};
                }else {
                    dic = {socre:this.count_sorce(right),des:"right"};
                }
            }else {
                if (this.count_sorce(left) > this.count_sorce(right)){
                    dic = {socre:this.count_sorce(left),des:"left"};
                }else {
                    dic = {socre:this.count_sorce(right),des:"right"};
                }
            }
            return dic;
        }else{
            if (this.count_sorce(bot) > this.count_sorce(left)){
                if (this.count_sorce(bot) > this.count_sorce(right)){
                    dic = {socre:this.count_sorce(bot),des:"bot"};
                }else {
                    dic = {socre:this.count_sorce(right),des:"right"};
                }
            }else {
                if (this.count_sorce(left) > this.count_sorce(right)){
                    dic = {socre:this.count_sorce(left),des:"left"};
                }else {
                    dic = {socre:this.count_sorce(right),des:"right"};

                }
            }
            return dic;
        }

    }

    count_sorce(arr){
        let temp = arr[0];
        for (let i in arr){
            if (arr[i]< 0)
                return arr[i];
            if (temp < arr[i])
                temp = arr[i];
        }
        return temp;

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
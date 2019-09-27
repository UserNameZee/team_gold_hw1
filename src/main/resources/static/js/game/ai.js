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
         //console.log(mov_arr);




         //make ai move
        let result = this.makeGuesses(mov_arr,this.stratego.chessBoardData);
        // console.log("ai move"+result.origin.pos.x);
        // console.log("ai move"+result.origin.pos.y);
        // console.log("ai move"+result.score);
        let des= result.origin;
        //console.log("des"+des);
        let ox=des.pos.x;
        let oy=des.pos.y;
        let go=result.des;
        //console.log("des "+ go);
        let dx=ox;
        let dy=oy;

        if(go=="top"){
            dx=ox;
            dy=oy-1;
        }else if(go=="bot"){
            dx=ox;
            dy=oy+1;
        }else if(go=="left"){
            dx=ox-1;
            dy=oy;
        }else if(go=="right"){
            dx=ox+1;
            dy=oy;
        }else{
            console.log("wrong des pass through: "+go)
        }


        // //move a test random move
        // let ran=Math.floor(Math.random()*mov_arr.length)
        // let result=mov_arr[ran]
        // console.log(result);
        // let des= result.origin;
        // console.log("des"+des);
        // let ox=des.pos.x;
        // let oy=des.pos.y;
        // let dx=ox;
        // let dy=oy;
        // if(result.below!==null){
        //     dx=ox;
        //     dy=oy+1;
        // }else if(result.above!==null){
        //     dx=ox;
        //     dy=oy-1;
        // }else if(result.left!==null){
        //     dx=ox-1;
        //     dy=oy;
        // }else{
        //     dx=ox+1;
        //     dy=oy;
        // }






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
        //calculate all the score in the minmax array
        for (let i =0; i<movableArr.length;i++){
            let temp=this.calScore(movableArr[i],board);
            movableArr[i].score=temp.score;
            movableArr[i].des=temp.des;
        }
        console.log("score array is here")
        console.log(movableArr)
        let max=-8888;
        let result=new Array();
        //get max score in the minmax array
        for(let j=1;j<movableArr.length;j++){
            if(movableArr[j].score>max){
                max=movableArr[j].score;
                result=[];
                result[0]= movableArr[j];
            }else if(movableArr[j].score==max){
                result.push(movableArr[j]);
            }
        }
        //console.log("result array is here: "+result);
        let temp=0;
        while(temp<result.length){
            if(result[temp].des=="bot"){
                return result[temp];
            }
        temp++;
        }
        let randomNum=Math.floor(Math.random()*result.length)
        return result[randomNum];

    }


    /*寻找所有棋子，可移动棋子加入array */
    findMovablePieces(board,AI){
        let movable_pieces = new Array();
        for (let y = 0 ; y < 10; y++){
            for(let x = 0 ; x < 10; x++){
                //console.log(y+"--"+x);
                if(board[y][x]!=undefined  && board[y][x]!="water" && board[y][x].team!=2 && board[y][x].movetype!=0){
                    //console.log("enter if")
                    let temp={origin: board[y][x]};
                    if(y>0){
                        if(this.movablePieces(board[y-1][x],y-1,x)){
                            temp.above=board[y-1][x];
                        }else{
                            temp.above=null;
                        }
                    }else{
                        temp.above=null;
                    }

                    if(y<9){
                        if(this.movablePieces(board[y+1][x],y+1,x)){
                            temp.below=board[y+1][x];
                        }else{
                            temp.below=null;
                        }
                    }else{
                        temp.below=null;
                    }


                    if(x>0){
                        if(this.movablePieces(board[y][x-1],y,x-1)){
                            temp.left=board[y][x-1];
                        }else{
                            temp.left=null;
                        }
                    }else{
                        temp.left=null;
                    }

                    if(x<9){
                        if(this.movablePieces(board[y][x+1],y,x+1)){
                            //console.log("right side add pieces")
                            temp.right=board[y][x+1];
                        }else{
                            temp.right=null;
                        }
                    }else{
                        temp.right=null;
                    }


                    if( temp.above !== null||temp.below !== null||temp.left !== null||temp.right !== null ){
                        //console.log(" push pieces into movable pieces")
                        movable_pieces.push(temp);
                    }
                }
            }
        }
        return movable_pieces;
    }


    movablePieces(target,y,x) {
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
        let L_top,L_bot,R_top,R_bot;
        let temp_x = target.origin.pos.x;
        let temp_y = target.origin.pos.y;

        if (target.above !== null){
            let above_x = temp_x;
            let above_y = temp_y -1;

            top[0] =  this.comparePieces(target,target.above);
            if ( above_y > 0 && this.movablePieces(board[above_x][above_y-1],above_x,above_y -1)) {
                top[1] = this.comparePieces(target,board[above_x][above_y-1]);
            }
            if ( above_x > 0 && this.movablePieces(board[above_x - 1][above_y],above_x -1,above_y)){
                if (board[above_x - 1][above_y] !== undefined)
                    L_top = board[above_x - 1][above_y];
                else
                    L_top = undefined;

                top[2] = this.comparePieces(target,L_top);
            }

            if ( above_x < 8 && this.movablePieces(board[above_x + 1][above_y],above_x+ 1,above_y)){
                if (board[above_x + 1][above_y] !== undefined)
                    R_top = board[above_x + 1][above_y];
                else
                    R_top = undefined;
                top[3] = this.comparePieces(target,R_top);
            }
        }
        if(target.below !== null){
            let below_x = temp_x;
            let below_y = temp_y + 1;
            bot[0] =  this.comparePieces(target,target.below);
            if ( below_y < 8  && (this.movablePieces(board[below_x][below_y+1],below_x,below_y +1)) ) {
                bot[1] = this.comparePieces(target,board[below_x][below_y+1]);
            }
            if (below_x > 1 && this.movablePieces(board[below_x - 1][below_y],below_x-1,below_y)){
                if (board[below_x - 1][below_y] !== undefined)
                    L_bot = board[below_x - 1][below_y];
                else
                    L_bot = undefined;

                bot[2] = this.comparePieces(target,L_bot);
            }

            if (below_x < 8 && this.movablePieces(board[below_x +1][below_y],below_x+1,below_y)){
                if (board[below_x + 1][below_y] != undefined)
                    R_bot = board[below_x + 1][below_y];
                else
                    R_bot = undefined;
                bot[3] = this.comparePieces(target,R_bot);
            }
        }
        if (target.left !== null){
            let left_x = temp_x -1;
            let left_y = temp_y;
            if (left_x > 0 && this.movablePieces(board[left_x -1][left_y],left_x-1,left_y)){
                left[1] = this.comparePieces(target,board[left_x-1][left_y]);
            }
            left[2] = bot[2];
            left[3] = top[2];
        }
        if (target.right !== null){
            let left_x = temp_x +1;
            let left_y = temp_y;
            if (left_x < 8  && this.movablePieces(board[left_x+1][left_y],left_x+1,left_y)){
                right[1] = this.comparePieces(target,board[left_x+1][left_y]);
            }
            right[2] = bot[3];
            right[3] = top[3];
        }


        let right_score = this.count_sorce(right);
        let left_score= this.count_sorce(left);
        let top_score= this.count_sorce(top);
        let bot_score= this.count_sorce(bot);



        let dic={score: -999, des: null}
        if (top_score > bot_score){
            if (top_score > left_score){
                if (top_score  > right_score){
                    dic = {score:top_score,des:"top"};
                }else {
                    dic = {score:right_score,des:"right"};
                }
            }else {
                if (left_score > right_score){
                    dic = {score:left_score,des:"left"};
                }else {
                    dic = {score:right_score,des:"right"};
                }
            }
            return dic;
        }else{
            if (bot_score > left_score){
                if (bot_score > right_score){
                    dic = {score:bot_score,des:"bot"};
                }else {
                    dic = {score:right_score,des:"right"};
                }
            }else {
                if (left_score > right_score){
                    dic = {score:left_score,des:"left"};
                }else {
                    dic = {score:right_score,des:"right"};

                }
            }
            return dic;
        }

    }

    count_sorce(arr){
        let temp = -999;
        for (let i in arr){
            if (arr[i]< 0 && arr[i]!=undefined)
                return arr[i];
            if (temp < arr[i])
                temp = arr[i];
        }
        return temp;

    }


    comparePieces(att,def) {
        if (def == undefined)
            return 0;
        if (att.origin.rank > def.rank)
            return def.rank
        if (att.origin.rank < def.rank)
            return -att.rank;
        else{
            return 0;
        }
    }
}
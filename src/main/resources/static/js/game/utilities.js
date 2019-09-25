Tools = {
    slotId2Pos : function(slotId){
        y = Math.floor(slotId / 10);
        x = Math.floor(slotId % 10);
        // console.log("slotId: " + slotId  + ", x: " + x + ", y: " + y);
        return new Point(x, y);
    },

   getSlotsIdSet : function (startPos){
        let slotsIdSet = new Array();
        for (let i = 0; i < 40; i++){
            slotsIdSet[i] = startPos + i;
        }
        slotsIdSet.sort(function (a, b) { return Math.random() > 0.5 ? -1 : 1; });
        return slotsIdSet;
    },

   getAiIdSet  : function () {

        let board = new Array(40);
        //set flag--1
       //console.log("flag")

        let flag= Math.floor(Math.random() * 6)+32
        board[39]=flag;

        //set boom--6
        //console.log("boom")
       let temp=0;
        while(temp<6){
            let boom=Math.floor(Math.random() * 20)+10
            if(!board.includes(boom)){
                board[temp]=boom;
                temp++;
            }
        }
        //console.log(board);

        //set spy--1
       //console.log("111")
       temp=0;
        while(temp<1){
            let spy=Math.floor(Math.random() * 30)+10
            if(!board.includes(spy)){
                board[6]=spy;
                temp++;
            }
        }
        //scout--8
       //console.log("scout")
       temp=0;
        while(temp<8){
            let scout=Math.floor(Math.random() * 10);
            if(!board.includes(scout)){
                board[7+temp]=scout;
                temp++;
            }
        }
        // set 10 -- 1
       //console.log("1010")
       temp=0;
        while(temp<1){
            let chess10=Math.floor(Math.random() * 20)+10;
            if(!board.includes(chess10)){
                board[38]=chess10;
                temp++;
            }
        }

        // set 9 -- 1
       //console.log("9999")
        while(true){
            let chess9=Math.floor(Math.random() * 39);
            if(!board.includes(chess9)){
                board[37]=chess9;
                break;
            }
        }


        // set 8 -- 2
       //console.log("8888")
       temp=0;
        while(temp<2){
            let chess8=Math.floor(Math.random() * 39);
            if(!board.includes(chess8)){
                board[35+temp]=chess8;
                temp++;
            }
        }

        // set 7 -- 3
       //console.log("7777")
       temp=0;
        while(temp<3){
            let chess7=Math.floor(Math.random() * 39);
            if(!board.includes(chess7)){
                board[32+temp]=chess7;
                temp++;
            }
        }


        // set 6 -- 4
       //console.log("6666")
       temp=0;
        while(temp<4){
            let chess6=Math.floor(Math.random() * 39);
            if(!board.includes(chess6)){
                board[28+temp]=chess6;
                temp++;
            }
        }

        //console.log(board);
        // set 4 -- 4

       temp=0;
        while(temp<4){
            let chess4=this.getFirstFreePos(board);
            board[20+temp]=chess4;
            temp++;
        }

        // set 5 -- 4

       temp=0;
        while(temp<4){
            let chess5=this.getFirstFreePos(board);
                board[24+temp]=chess5;
                temp++;
        }

        // set 3 -- 5
       temp=0;
        while(temp<5){
            let chess3=this.getFirstFreePos(board);
                board[15+temp]=chess3;
                temp++;
        }
        for(let i=0;i<40;i++){
            board[i]=39-board[i];
        }
        return board;
    },

    getFirstFreePos(board){
        let i=0;
        while(i<40){
            if(!board.includes(i)){
                return i;
            }
            i++;
        }
        return undefined;

    }
}
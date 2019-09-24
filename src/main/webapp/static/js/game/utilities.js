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
    }
}
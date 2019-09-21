class Player {
    id = 0;
    isSelect = false;
    selectPos = new Point(-1, -1);
    selectPiece = null;
    lastMove = {
        from : new Point(0, 0),
        to : new Point(0, 0),
        set : function (from, to){
            this.from.assign(from);
            this.to.assign(to)
        }
    }

    constructor(id){
        this.id = id;
    }

    deSelect(){
        this.isSelect = false;
        this.selectPos = new Point(-1, -1);
        this.selectPiece = null;
    }
}
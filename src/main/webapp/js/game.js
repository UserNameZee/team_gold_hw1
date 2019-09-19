
 class Stratego {
    start(){
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
        this.canvas.onclick = function (e){
            let point = new Point(Math.ceil(e.clientX/cell_w) - 1, Math.ceil(e.clientY/cell_h) - 1 );
            console.log(chessBoardData[point.y][point.x]);
        }
    }

    initChessBoardData(){
        for (let y = 0; y < 10; y++){
            this.chessBoardData[y] = new Array(10);
        };
    };


}

 const Game = new Stratego();



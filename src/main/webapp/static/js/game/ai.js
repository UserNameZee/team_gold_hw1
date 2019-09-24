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
}
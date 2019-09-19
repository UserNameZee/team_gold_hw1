class Point {
    x = 0;
    y = 0;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    isEqualto(point){
        if (this.x == point.x && this.y == point.y){
            return true;
        }
        return false;
    }
}
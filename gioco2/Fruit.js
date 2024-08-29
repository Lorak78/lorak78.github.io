class Fruit{
    constructor(){
        this.posx = 7*DIST
        this.posy = 6*DIST
    }
    randomize_position(){
        this.posx = Math.floor(Math.random() * 10) * DIST
        this.posy = Math.floor(Math.random() * 10) * DIST
    }
    reset_pos(){
        this.posx = 7*DIST
        this.posy = 6*DIST
    }
}
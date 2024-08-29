class PlayerBody{
    constructor(posx, posy){
        this.posx = posx
        this.posy = posy

        this.prev_posx = posx
        this.prev_posy = posy
    }

    follow(obj){
        this.prev_posx = this.posx
        this.prev_posy = this.posy
        this.posx = obj.prev_posx
        this.posy = obj.prev_posy
    }
}
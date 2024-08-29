class Player{
    constructor(){
        this.posx = 2 * DIST
        this.posy = 6 * DIST
        this.face_r = true
        this.face_d = false
        this.face_u = false
        this.face_l = false

        this.prev_posx = 2 * DIST
        this.prev_posy = 6 * DIST
    }

    move(){
        this.prev_posx = this.posx
        this.prev_posy = this.posy
        if(this.face_r){
            this.posx += DIST
        }
        if(this.face_d){
            this.posy += DIST
        }
        if(this.face_u){
            this.posy -= DIST
        }
        if(this.face_l){
            this.posx -= DIST
        }
    }

    offscreen(){
        return (this.posx >= 9*DIST + 30) || (this.posy >= 9*DIST + 30) || (this.posx <= -30) || (this.posy <= -30)
    }

    reset_pos(){
        this.posx = 2*DIST
        this.posy = 6*DIST
        this.prev_posx = 2*DIST
        this.prev_posy = 6*DIST
        this.face_r = true
        this.face_d = false
        this.face_u = false
        this.face_l = false
        
    }

}
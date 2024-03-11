const PLAYER_WIDTH = 100, PLAYER_HEIGHT = 150
const SPEED = 8
const JUMP_HEIGHT = -30
const ON_FLOOR = FLOOR_POSY - PLAYER_HEIGHT

class Player{
    constructor(init_posx, init_posy){
        this.init_posx = init_posx
        this.init_posy = init_posy

        this.posx = init_posx
        this.posy = init_posy

        this.speedy = 0
        this.playerLeft = loadImage("./img/playerLeft.png")
        this.playerLeft.resize(PLAYER_WIDTH, PLAYER_HEIGHT)
        this.playerRight = loadImage("./img/playerRight.png")
        this.playerRight.resize(PLAYER_WIDTH, PLAYER_HEIGHT)

        this.moving_right = false
        this.moving_left = false;
    }

    draw_player(){
        if(this.posy > ON_FLOOR){
            this.posy = ON_FLOOR
        }
        if(this.moving_left){
            image(this.playerLeft, this.posx, this.posy)
            this.facing_left = true
            this.facing_right = false;
        }
        else if(this.moving_right){
            image(this.playerRight, this.posx, this.posy)
            this.facing_right = true;
            this.facing_left = false
        }
        else{
            image(this.playerLeft, this.posx, this.posy)
            this.facing_left = true
            this.facing_right = false;
        }  
    }

    gravity(grav){  
        this.speedy += grav 
        if(this.posy > ON_FLOOR){
            this.posy = ON_FLOOR
            this.speedy = 0
        }
        this.posy += this.speedy
    }

    right(){
        this.posx += SPEED
        this.moving_right = true
        this.moving_left = false
    }
    
    left(){
        this.posx -= SPEED;
        this.moving_right = false
        this.moving_left = true
    }

    jump(){
        this.speedy = JUMP_HEIGHT
    }

    on_floor(){
        return this.posy + PLAYER_HEIGHT >= FLOOR_POSY;
    }
    
    reset_pos(){
        this.posx = this.init_posx
        this.posy = this.init_posy
    }

    collision_detection(spike){
        let d = dist(this.posx, this.posy, spike.posx, spike.posy)
        if(d < 90){
            this.reset_pos()
            return true
        }
        return false
    }
}       
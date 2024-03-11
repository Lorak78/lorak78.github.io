let SPIKE_SPEED = 10

class Spike{
    constructor(init_posx, init_posy){
        this.init_posx = init_posx
        this.init_posy = init_posy

        this.posx = init_posx
        this.posy = init_posy

        this.spike_img = loadImage("./img/spikeLeft.png");
        SPIKE_SPEED += 2 * difficulty
    }
    is_offscreen(){
        return (this.posx < 0 - SPIKE_SIZE || this.posx > CANVAS_WIDTH)
    }
    draw_spike(){
        image(this.spike_img, this.posx, this.posy);
    }
    move(){
        this.posx -= SPIKE_SPEED
    }
    reset_pos(){
        this.posx = this.init_posx
        this.posy = this.init_posy
    }
}
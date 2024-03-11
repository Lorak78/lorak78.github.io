let bgimg, floor
let player
let spikes = [];
let died = false
const FPS = 60
const CANVAS_WIDTH = 1520
const CANVAS_HEIGHT = 840
const FLOOR_POSY = 640

const SPIKE_SIZE = 130
const MAX_DIFFICULTY = 3
let difficulty = -1, score = -1, start, k = 0

const GRAVITY = 0.95;
const GRAVITY_MULTIPLIER = 2.3

const KEYS = {
    D: 68,
    d: 100,
    A: 65,
    a: 97,
    SPACE: 32
};

function gravity(){
    if(!keyIsDown(KEYS.SPACE)){
        player.gravity(GRAVITY * GRAVITY_MULTIPLIER)
    }
    else{
        player.gravity(GRAVITY)
    }
}

function preload(){
    bgimg = loadImage("./img/sky.jfif")
    floor = loadImage("./img/floor.jfif")
    start_screen = loadImage("./img/start_screen.jfif")
    death_screen = loadImage("./img/death_screen.jpg")
}
function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    player = new Player(100, FLOOR_POSY - PLAYER_HEIGHT)
    
    let spike_posx = CANVAS_WIDTH
    let spike_posy = FLOOR_POSY - SPIKE_SIZE
    for(let i = 0; i < MAX_DIFFICULTY; i++){
        spikes.push(new Spike(spike_posx, spike_posy))
        spike_posy = spike_posy - SPIKE_SIZE - 40
    }

    frameRate(FPS);
}

function draw_objects(){
    player.draw_player()
    for(let i = 0; i < difficulty; i++){
        spikes[i].draw_spike();
        spikes[i].move();
    }
}

function collision_detection(){
    for(let i = 0; i < difficulty; i++){    
        died = player.collision_detection(spikes[i])
        if(died){
            break
        }
    }
}

function draw(){
    if(!died){
        if(difficulty != -1){
            if(score == -1){
                start = performance.now()
                k = 0
                score = 0
            }
            background(bgimg)
            if(keyIsDown(KEYS.D) || keyIsDown(KEYS.d)){
                player.right()
            }
            if(keyIsDown(KEYS.A) || keyIsDown(KEYS.a)){
                player.left()
            }
            if(keyIsDown(KEYS.SPACE) && player.on_floor()){
                player.jump()
            }
            
            gravity()
            draw_objects()
            collision_detection()
            for(let i = 0; i < difficulty; i++){
                if(spikes[i].is_offscreen()){
                    spikes[i].reset_pos()
                }
            }
        }
        else{
            background(start_screen)
            score = -1
        }
    }
    else{
        background(death_screen)
        if(k == 0){
            score = performance.now() - start
            k++
        }
        print_score()   
    }
    image(floor, 0, FLOOR_POSY)
}

function keyPressed(){
    if(difficulty == -1 || keyCode == ESCAPE){
        difficulty = -1
        SPIKE_SPEED = 9
        for(let i = 0; i < spikes.length; i++){
            let t = spikes.pop()
        }
        if(key == "1"){
            difficulty = 1;
        }
        if(key == "2"){
            difficulty = 2;
        }
        if(key == "3"){
            difficulty = 3;
        }
        let spike_posx = CANVAS_WIDTH
        let spike_posy = FLOOR_POSY - SPIKE_SIZE
        for(let i = 0; i < difficulty; i++){
            spikes.push(new Spike(spike_posx, spike_posy))
            spike_posy = spike_posy - SPIKE_SIZE - 40
            spikes[i].reset_pos()
        }
        player.reset_pos()
        died = false
    }
}

function print_score(){
    textSize(35);
    fill('white');
    textStyle(BOLD);
    text(score, CANVAS_WIDTH / 2 + 150, CANVAS_HEIGHT / 2 - 85);
}
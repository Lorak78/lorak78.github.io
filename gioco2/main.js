let bgimg, start_screen, death_screen
let started = false
let player
let body, head_u, head_r, head_l, head_d
let playerBody, previous_frame
let obj_fruit
let died = false
const FPS = 6
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const DIST = 60
let difficulty = -1, score = 0
let k = 0
let free_cells

const KEYS = {
    D: 68,
    d: 100,
    A: 65,
    a: 97,
    S: 83,
    s: 115,
    W: 87,
    w: 119
};

function reset_positions(){
    player.reset_pos()
    playerBody = [player, new PlayerBody(1*DIST, 6*DIST)]
    obj_fruit.reset_pos()
    score = 0
}

function preload(){
    bgimg = loadImage("./img/bgimg.png")
    start_screen = loadImage("./img/start_screen.png")
    death_screen = loadImage("./img/death_screen.png")
    head_r = loadImage("./img/snake/head_r.jpg")
    head_l = loadImage("./img/snake/head_l.jpg")
    head_u = loadImage("./img/snake/head_u.jpg")
    head_d = loadImage("./img/snake/head_d.jpg")
    body = loadImage("./img/snake/body.jpg")
    fruit = loadImage("./img/fruit.png")
    player = new Player()
    obj_fruit = new Fruit()
    playerBody = [player, new PlayerBody(1*DIST, 6*DIST)]
}
function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    frameRate(FPS);
}

function draw_objects(){

}

function collision_detection(){

}

function new_body_part(){
    let length = playerBody.length
    playerBody.push(new PlayerBody(playerBody[length - 1].prev_posx, playerBody[length - 1].prev_posy))
}

function same_cell(posx1, posy1, posx2, posy2){
    return (posx2 < posx1 + 30 && posx2 > posx1 - 30) && (posy2 < posy1 + 30 && posy2 > posy1 - 30)
}

function random_choice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function draw(){
    background(bgimg)
    
    if(died){
        for(let k = 1; k < playerBody.length; k++){
            image(death_screen, 0, 0)
            image(body, playerBody[k].posx, playerBody[k].posy)
        }
    }

    if (!started && !died){
        image(start_screen,0,0)
        image(head_r, 2*DIST, 6*DIST)
        image(body, 1*DIST, 6*DIST)
        image(fruit, 7*DIST, 6*DIST)
        
    }
    else{
        if(!died){
            image(fruit, obj_fruit.posx, obj_fruit.posy)
            player.move()
            if(player.face_r){
                image(head_r, player.posx, player.posy)
            }
            else{
                if(player.face_d){
                    image(head_d, player.posx, player.posy)
                }
                else{
                    if(player.face_u){
                        image(head_u, player.posx, player.posy)
                    }
                    else{
                        image(head_l, player.posx, player.posy)
                    }
                }
            }
            if(same_cell(player.posx, player.posy, obj_fruit.posx, obj_fruit.posy)){
                obj_fruit.randomize_position(free_cells)
                new_body_part()
                score++
            }
            for(let k = 1; k < playerBody.length; k++){    
                playerBody[k].follow(playerBody[k - 1])
                image(body, playerBody[k].posx, playerBody[k].posy)
            }
            if(player.offscreen()){
                died = true
                started = false
            }
            for(let k = 1; k < playerBody.length; k++){ 
                if(same_cell(player.posx, player.posy, playerBody[k].posx, playerBody[k].posy)){
                    died = true
                    started = false
                    break
                }  
            }
        }
    }
    print_score()
}

function keyPressed(){
    if(!started && !died){
        if(keyIsDown(KEYS.A) || keyIsDown(KEYS.a) || keyIsDown(KEYS.s) || keyIsDown(KEYS.S) || keyIsDown(KEYS.d) || keyIsDown(KEYS.D) || keyIsDown(KEYS.w) || keyIsDown(KEYS.W)){
            started = true
        }
    }
    else{
        if(keyIsDown(KEYS.A) || keyIsDown(KEYS.a)){
            if(!player.face_r){
                player.face_r = false
                player.face_d = false
                player.face_u = false
                player.face_l = true
            }
        }
        if(keyIsDown(KEYS.s) || keyIsDown(KEYS.S)){
            if(!player.face_u){
                player.face_r = false
                player.face_d = true
                player.face_u = false
                player.face_l = false
            }
        }
        if(keyIsDown(KEYS.d) || keyIsDown(KEYS.D)){
            if(!player.face_l){
                player.face_r = true
                player.face_d = false
                player.face_u = false
                player.face_l = false
            }
        }
        if(keyIsDown(KEYS.w) || keyIsDown(KEYS.W)){
            if(!player.face_d){
                player.face_r = false
                player.face_d = false
                player.face_u = true
                player.face_l = false
            }
        }
    }
    
    if(died){
        died = false
        started = false
        reset_positions()
    }
    
}

function print_score(){
    textSize(35);
    fill('black');
    textStyle(BOLD);
    text("Score: " + score, 10, 43);
}
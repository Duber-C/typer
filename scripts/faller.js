class Word {
    constructor (x, y, w, speed){
        this.x = x
        this.y = y
        this.w = w
        this.speed = speed
        this.active = true
    }
}


function createWord(params) {
    i = Math.round(Math.random() * params.length - 1)
    x = Math.round(Math.random() * (CANVAS_WIDTH - params[i].length - 75))
    speed = Math.floor((Math.random() * 4) + 1)

    return new Word(x + 25, 0, params[i], speed)
}

function init() {
    WORD_ARRAY.push(createWord(FALLER_WORDS))
}

function drawWord(params) {
    if (params.active){
        ctx.fillText(params.w, params.x, params.y)
    }
}

let canvas = document.getElementById("faller-canvas")
let ctx = canvas.getContext("2d")

// VARIABLES GLOBALES

let CANVAS_WIDTH = parseInt(canvas.getAttribute("width"))
let CANVAS_HEIGHT = parseInt(canvas.getAttribute("height"))
let NUM_WORDS = 20;
let FALLER_WORDS = hundredWords
let WORD_ARRAY = []
let PLAY = true
let TIME = 50;
WRITING = new Word(100, 100, '', 0)
TIME_WORD = new Word(30, 50, TIME.toString(), 0)

// init

ctx.font = '20px serif';
init()

setInterval(run, 50)

setInterval(() => {
    if (PLAY){
        WORD_ARRAY.push(createWord(FALLER_WORDS))

        TIME -= 1
        TIME_WORD.w = TIME.toString()
    }
}, 1000);

setInterval(() => {
    PLAY = false;
}, 50000);

function run() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    [...WORD_ARRAY].forEach(element => {
        element.y += element.speed 
        
        ctx.fillStyle = "green" 
        drawWord(element)

        if (element.y > CANVAS_HEIGHT){
            element.active = false
        }
    })

    ctx.fillStyle = "blue" 
    drawWord(WRITING)

    ctx.fillStyle = "white" 
    drawWord(TIME_WORD)
}

window.addEventListener('keydown',  (event => {

    ctx.fillStyle = "blue" 
    drawWord(WRITING)
    
    if (PLAY){
        if (event.key === ' '){
            WORD_ARRAY.forEach(element => {
                if (element.w === WRITING.w){
                    element.active = false

                    if (Math.random() > 0.7){
                        WORD_ARRAY.push(createWord(FALLER_WORDS))
                    }
                }
            })
            WRITING.w = ''
        }else if (event.key.length === 1){
            WRITING.w += event.key
        }else if (event.key === 'Backspace') {
            WRITING.w = WRITING.w.slice(0, WRITING.w.length - 1)
        }
    }
}))
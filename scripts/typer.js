function buildList(l, n){
    // construye una lista de palabras aleatorias

    let p = [];
    for (var i=0 ; i < n; i++){
        let rand = Math.round(Math.random() * 99);
        p.push(l[rand]);
    }

    return p;
}

function buildParagraph(l){
    // convierte una lista en una cadena de caracteres
    // separada por espacios

    let p = "";
    for (i in l){
        if (i == l.length-1){
           p += l[i];
        }else {
            p += l[i] + " ";
        }
    }
    return p;
}

function toggle(e){
    let element = document.getElementById(e);

    if (element.style.display === "none"){
        element.style.display = "block";
    }else {
        element.style.display = "none";
    }
}

function probabilityTable(){
    // crea una matriz de segun la frecuencia de cada letra

    let l = Object.keys(WORDS_FRECUENCY);
    let table = new Array();

    for (i in l){
        let n = WORDS_FRECUENCY[l[i]];

        for (let j = 0; j < n * 10; j++){
            table.push(l[i]);
        }
    }
    
    return table;
}

function buildPhrase(){
    // crea una cadena de caracteres de acuerdo 
    // a la matriz de frecuencia

    let phrase = '';

    for(let i = 0; i < PHRASE_LEN; i++){
        let m = Math.ceil(Math.random() * 999);
        phrase += TABLE[m];
    }
    return phrase;
}

function isLetter(c){
    // comprueba si los caracteres son iguales

    if (c ===  PARAGRAPH[CPOINTER]){
        return true;
    }else {
        return false;
    }
}

function addLetter(c, ind){
    // crea una etiqueta <span> con la letra ingresada

    let character = document.createElement('span');
    character.appendChild(document.createTextNode(c));
    TYPER.insertBefore(character, TYPER.childNodes[ind]);
}

function removeLetter(ind){
    TYPER.removeChild(TYPER.childNodes[ind]);
}

function removeWords(l){
    l.forEach(element => {
        TYPER.removeChild(element);
    });
}

function start(){
    removeWords([...TYPER.childNodes]);
    CPOINTER = 0;
    WPOINTER = 0;
    PHRASE_LEN = parseInt(document.getElementById("phrase-len").value);
    WORDS = hundredWords;
    PHRASE = buildList(WORDS, PHRASE_LEN);
    PARAGRAPH = buildParagraph(PHRASE);
    START = false;
    END = false;
    TIMESTART = null;
    WPM = 0;
    for (i in PARAGRAPH){
        addLetter(PARAGRAPH[i], i);
    }
}

// VARIABLES GLOBALES
let WORDS_FRECUENCY = {' ': 17.5, 'a': 11.1, 'e': 10.1, 'o': 7.4, 's': 5.8, 'r': 5.1,
                        'n': 5.0, 'i': 5.0, 'l': 4.8, 'd': 3.9, 'u': 3.3, 't': 3.1, 'c': 3.0,
                        'm': 2.1, 'p': 2.0, 'b': 1.5, '.': 1.5, ',': 1.4, 'q': 1.0, 'v': 0.9,
                        'g': 0.9, 'h': 0.8, 'y': 0.8, 'f': 0.5, 'j': 0.4, 'z': 0.3, ';': 0.2, 
                        'ñ': 0.2, 'x': 0.1, ':': 0.1, 'k': 0.1, 'w': 0.1};
//let WORDS = buildPhrase();
//let TABLE = probabilityTable();

let TYPER = document.getElementById('typer');
let CPOINTER = 0;
let WPOINTER = 0;
let PHRASE_LEN = parseInt(document.getElementById("phrase-len").value);
let WORDS = hundredWords;
let PHRASE = buildList(WORDS, PHRASE_LEN);
let PARAGRAPH = buildParagraph(PHRASE);
let START = false;
let END = false;
let TIMESTART = null;
let WPM = 0;

start();

window.onkeydown = (e => {
    if (!START){
        START = true;
        TIMESTART = new Date().getTime();
        WPM = 0;
    }
    
    if (!END && CPOINTER < PARAGRAPH.length) {

        if (e.key === 'Backspace' && WPOINTER > 0){
            WPOINTER -= 1;
            removeLetter(CPOINTER + WPOINTER)
        }else if (e.key.length === 1) {

            if (isLetter(e.key) && WPOINTER === 0){
                TYPER.childNodes[CPOINTER].style = 'color: var(--primary-color)';

                CPOINTER += 1;
            }else {
                addLetter(e.key, CPOINTER + WPOINTER);
                TYPER.childNodes[CPOINTER + WPOINTER].style = 'color: var(--quaternary-color);';
                
                WPOINTER += 1;
            }

            if (CPOINTER === PARAGRAPH.length){
                END = true;
                TIMESTART -= new Date().getTime();
                WPM = Math.round(Math.abs((CPOINTER/5)/((TIMESTART/1000)/60)));
    
                if (WPM){
                    document.getElementById("wps").textContent = WPM;
                }
            }else{
                TYPER.childNodes[CPOINTER + WPOINTER].style = "border-bottom: 2px solid var(--secundary-color)";
            } 
        }  
    }
});



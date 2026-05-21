
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  {x:0, y:6},
  {x:0, y:5},
  {x:0, y:4},
  {x:0, y:3},
  {x:0, y:2}
];

let puntaje = 0;

let comidaX = 0;
let comidaY = 0;

let direccionActual = "derecha";

let intervaloSerpiente;

function iniciarJuego(){

    intervaloSerpiente = setInterval(moverSerpiente, 1000);
}

function pausarJuego(){

    clearInterval(intervaloSerpiente);
    document.getElementById("estado").innerText = "Pausado"
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();

}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTablero() {

    ctx.strokeStyle = "black";

    // Líneas verticales
    for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    // Líneas horizontales
    for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

function pintarParte(lineaX, lineaY, color ="#3f5b8a"){

    ctx.fillStyle = color;

    ctx.fillRect(
        lineaX * TAMANIO_CELDA,
        lineaY * TAMANIO_CELDA,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    ctx.strokeStyle = "black";

    ctx.strokeRect(
        lineaX * TAMANIO_CELDA,
        lineaY * TAMANIO_CELDA,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );
}

function pintarSerpiente(){

    for(let i = 0; i < serpiente.length; i++){

        let parte = serpiente[i];

        if(i == 0){

            pintarParte(parte.x, parte.y, "yellow");

        }else{

            pintarParte(parte.x, parte.y, "red");
        }
    }
}

function moverDerecha(){

    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x + 1,
        y: cabeza.y
    };

    serpiente.unshift(nuevaCabeza);

}

function moverIzquierda(){

    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x - 1,
        y: cabeza.y
    };

    serpiente.unshift(nuevaCabeza);

}

function moverArriba(){

    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y - 1
    };

    serpiente.unshift(nuevaCabeza);

}

function moverAbajo(){

    let cabeza = serpiente[0];

    let nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y + 1
    };

    serpiente.unshift(nuevaCabeza);

}

function cambiarDireccion(direccion){

    direccionActual = direccion;
}

function moverSerpiente(){

    if(direccionActual == "derecha"){

        moverDerecha();

    }else if(direccionActual == "izquierda"){

        moverIzquierda();

    }else if(direccionActual == "arriba"){

        moverArriba();

    }else if(direccionActual == "abajo"){

        moverAbajo();
    }

    if(atrapaComida()){

        puntaje++;

        document.getElementById('puntaje').innerText = puntaje

        generarComida();

    }else{

        serpiente.pop();
    }

    dibujarTodo();
}

function pintarComida(){

    ctx.fillStyle = "green";

    ctx.fillRect(
        comidaX * TAMANIO_CELDA,
        comidaY * TAMANIO_CELDA,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );

    ctx.strokeStyle = "black";

    ctx.strokeRect(
        comidaX * TAMANIO_CELDA,
        comidaY * TAMANIO_CELDA,
        TAMANIO_CELDA,
        TAMANIO_CELDA
    );
}

function generarComida(){

    comidaX = Math.floor(
        Math.random() * (canvas.width / TAMANIO_CELDA)
    );

    comidaY = Math.floor(
        Math.random() * (canvas.height / TAMANIO_CELDA)
    );
}

function atrapaComida(){

    let cabeza = serpiente[0];

    if(
        cabeza.x == comidaX &&
        cabeza.y == comidaY
    ){

        return true;
    }

    return false;
}


generarComida();

dibujarTodo();
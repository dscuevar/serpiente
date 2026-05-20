
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;


function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(0,19);

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

function pintarParte(lineaX, lineaY){

    ctx.fillStyle = "#3f5b8a";

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





dibujarTodo();
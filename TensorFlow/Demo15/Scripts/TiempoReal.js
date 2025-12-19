var ctx;
var modelo;

window.onload = async function () {
    ctx = canvas.getContext("2d");
    console.log("Cargando Modelo cocoSsd...");
    modelo = await cocoSsd.load();
    console.log("Modelo cocoSsd fue cargado");
    btnActivarCamara.style.display = "inline";

    btnActivarCamara.onclick = function () {
        if (btnActivarCamara.value == "Activar Camara") {
            btnActivarCamara.value = "Detener Camara";
            activarCamara();
        }
        else {
            btnActivarCamara.value = "Activar Camara";
            video.pause();
        }
    }
}

async function activarCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        video.play();
        setInterval(detectarObjetos, 100);
    }
    catch (error) {
        console.log('Error:', error);
    }
}

async function detectarObjetos() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const objDetecciones = await modelo.detect(img);
    console.log(objDetecciones);
    var nDetecciones = objDetecciones.length;
    spnMensaje.innerText = "Objetos Detectados: " + nDetecciones;
    var cuadro, ancho, alto, clase, prob;
    for (var i = 0; i < nDetecciones; i++) {
        cuadro = objDetecciones[i]["bbox"];
        clase = objDetecciones[i]["class"];
        prob = objDetecciones[i]["score"];
        ancho = Math.abs(cuadro[2] - cuadro[0]);
        alto = Math.abs(cuadro[3] - cuadro[1]);
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.strokeWidth = 5;
        ctx.rect(cuadro[0], cuadro[1], ancho, alto);
        ctx.stroke();
        ctx.closePath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(clase + ": " + prob, cuadro[0], cuadro[1] - 20);
    }
}
var ctx;
var idAnimacion;
var esActivo = false;
var detector;

window.onload = function () {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    iniciarModelo();

    btnActivarCamara.onclick = function () {
        if (btnActivarCamara.value == "Activar Camara") {
            btnActivarCamara.value = "Detener Camara";
            esActivo = true;
            activarCamara();
        }
        else {
            esActivo = false;
            btnActivarCamara.value = "Activar Camara";
            video.stop();
        }
    }
}

async function iniciarModelo() {
    console.log("Cargando el Modelo MediaPipe FaceDetection...");
    var modelo = await faceDetection.SupportedModels.MediaPipeFaceDetector;
    console.log("Modelo MediaPipe FaceDetection fue cargado");
    detector = await faceDetection.createDetector(modelo, { runtime: 'tfjs', maxFaces: 3 });
    btnActivarCamara.disabled = false;
}

async function activarCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        video.play();
        idAnimacion =  setInterval(detectarRostro, 100);
    }
    catch (error) {
        console.log('Error:', error);
    }
}

async function detectarRostro() {    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const faces = await detector.estimateFaces(img, { flipHorizontal: false });
    var nFaces = faces.length;
    spnMensaje.innerText = "Rostros Detectados: " + nFaces;
    var face, cuadro, ptosClave, x1, y1, ancho, alto;
    const brocha = 5;
    const color = "blue";
    for (var i = 0; i < nFaces; i++) {
        face = faces[i];
        cuadro = face["box"];
        ptosClave = face["keypoints"];
        //console.log("cuadro: ", cuadro);
        //console.log("ptosClave: ", ptosClave);        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.strokeWidth = brocha;
        x1 = cuadro["xMin"];
        y1 = cuadro["yMin"];
        ancho = cuadro["width"];
        alto = cuadro["height"];
        ctx.rect(x1, y1, ancho, alto);
        ctx.stroke();
        //Dibujar un Rectangulo Azul en cada parte de la cara        
        ctx.fillStyle = color;
        for (var j = 0; j < ptosClave.length; j++) {
            ctx.fillRect(ptosClave[j].x - brocha, ptosClave[j].y - brocha, 2 * brocha, 2 * brocha);
        }
        ctx.closePath();
    }    
    if (!esActivo) clearInterval(idAnimacion);
}
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
    console.log("Cargando el Modelo MediaPipe faceLandmarksDetection...");
    var modelo = await faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'tfjs', // or 'mediapipe'
        maxFaces: 10
    }
    detector = await faceLandmarksDetection.createDetector(modelo, detectorConfig);
    console.log("Modelo MediaPipe faceLandmarksDetection fue cargado");
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
    const faces = await detector.estimateFaces(img);
    var nFaces = faces.length;
    spnMensaje.innerText = "Rostros Detectados: " + nFaces;
    var face, ptosClave;
    const brocha = 2;
    const color = "white";
    for (var i = 0; i < nFaces; i++) {
        face = faces[i];
        ptosClave = face["keypoints"];      
        ctx.beginPath();
        ctx.fillStyle = color;
        for (var j = 0; j < ptosClave.length; j++) {
            ctx.fillRect(ptosClave[j].x - brocha, ptosClave[j].y - brocha, 2 * brocha, 2 * brocha);
        }
        ctx.closePath();
    }    
    if (!esActivo) clearInterval(idAnimacion);
}
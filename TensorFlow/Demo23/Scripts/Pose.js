var ctx;
var idAnimacion;
var esActivo = false;
var modelo;

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
    console.log("Cargando el Modelo PoseNet...");
    modelo = await posenet.load();
    console.log("Modelo PoseNet fue cargado");
    btnActivarCamara.disabled = false;
}

async function activarCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        video.play();
        idAnimacion = setInterval(detectarPose, 100);
    }
    catch (error) {
        console.log('Error:', error);
    }
}

async function detectarPose() {    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imageScaleFactor = 0.50;
    const flipHorizontal = false;
    const outputStride = 16;
    const maxPoseDetections = 5;
    const scoreThreshold = 0.7;
    const nmsRadius = 50;
    const poses = await modelo.estimateMultiplePoses(img, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
    var nPoses = poses.length;
    var pose, prob, ptosClave;
    const brocha = 4;
    const color = "blue";
    const brochaLinea = 2;
    const colorLinea = "yellow";
    var c = 0;
    var vectorRostro = [4, 2, 0, 1, 3];
    var vectorBrazos = [10, 8, 6, 5, 7, 9];
    var vectorIzquierdo = [6, 12, 14, 16];
    var vectorDerecho = [5, 11, 13, 15];
    for (var i = 0; i < nPoses; i++) {
        pose = poses[i];
        prob = pose["score"];
        console.log("prob: ", prob);
        ptosClave = pose["keypoints"];
        console.log("ptosClave: ", ptosClave);
        if (prob > 0.3) {
            c++;
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.lineWidth = brochaLinea;
            ctx.strokeStyle = colorLinea;
            for (var j = 0; j < ptosClave.length; j++) {
                ctx.fillRect(ptosClave[j].position.x - brocha, ptosClave[j].position.y - brocha, 2 * brocha, 2 * brocha);                
            }
            for (var j = 0; j < vectorRostro.length; j++) {
                if (j == 0) ctx.moveTo(ptosClave[vectorRostro[j]].position.x, ptosClave[vectorRostro[j]].position.y);
                else ctx.lineTo(ptosClave[vectorRostro[j]].position.x, ptosClave[vectorRostro[j]].position.y);
            }  
            for (var j = 0; j < vectorBrazos.length; j++) {
                if (j == 0) ctx.moveTo(ptosClave[vectorBrazos[j]].position.x, ptosClave[vectorBrazos[j]].position.y);
                else ctx.lineTo(ptosClave[vectorBrazos[j]].position.x, ptosClave[vectorBrazos[j]].position.y);
            }
            for (var j = 0; j < vectorIzquierdo.length; j++) {
                if (j == 0) ctx.moveTo(ptosClave[vectorIzquierdo[j]].position.x, ptosClave[vectorIzquierdo[j]].position.y);
                else ctx.lineTo(ptosClave[vectorIzquierdo[j]].position.x, ptosClave[vectorIzquierdo[j]].position.y);
            }
            for (var j = 0; j < vectorDerecho.length; j++) {
                if (j == 0) ctx.moveTo(ptosClave[vectorDerecho[j]].position.x, ptosClave[vectorDerecho[j]].position.y);
                else ctx.lineTo(ptosClave[vectorDerecho[j]].position.x, ptosClave[vectorDerecho[j]].position.y);
            }
            ctx.moveTo(ptosClave[12].position.x, ptosClave[12].position.y);
            ctx.lineTo(ptosClave[11].position.x, ptosClave[11].position.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
    spnMensaje.innerText = "Poses Detectadas: " + c;
    if (!esActivo) clearInterval(idAnimacion);
}
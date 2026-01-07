var modelo;
var ctx;

window.onload = function () {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    iniciarModelo();

    btnSeleccionar.onclick = function () {
        fupImagen.click();
    }

    fupImagen.onchange = function (event) {
        var file = this.files[0];
        txtArchivo.value = file.name;
        var reader = new FileReader();
        reader.onload = function () {
            imgPreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }

    btnDetectarPoses.onclick = async function () {
        canvas.width = imgPreview.width;
        canvas.height = imgPreview.height;
        ctx.drawImage(imgPreview, 0, 0, canvas.width, canvas.height);
        const imageScaleFactor = 0.50;
        const flipHorizontal = false;
        const outputStride = 16;
        const maxPoseDetections = 5;
        const scoreThreshold = 0.7;
        const nmsRadius = 50;
        const poses = await modelo.estimateMultiplePoses(imgPreview, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections, scoreThreshold, nmsRadius);
        var nPoses = poses.length;        
        var pose, prob, ptosClave;
        const brocha = 4;
        const color = "blue";
        const brochaLinea = 2;
        const colorLinea = "yellow";
        var c = 0;
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
                    if (j == 0) ctx.moveTo(ptosClave[j].position.x, ptosClave[j].position.y);
                    else ctx.lineTo(ptosClave[j].position.x, ptosClave[j].position.y);
                }
                ctx.stroke();
                ctx.closePath();
            }
        }
        spnMensaje.innerText = "Poses Detectadas: " + c;
    }

    btnNuevo.onclick = function () {
        spnMensaje.innerText = "";
        txtArchivo.value = "";
        fupImagen.value = "";
        imgPreview.src = "";
        canvas.width = 600;
        canvas.height = 400;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    btnDescargar.onclick = function () {
        var enlace = document.createElement("a");
        enlace.download = "Foto.png";
        enlace.href = canvas.toDataURL();
        enlace.click();
    }
}

async function iniciarModelo() {
    console.log("Cargando el Modelo PoseNet...");
    modelo = await posenet.load();
    console.log("Modelo PoseNet fue cargado");
    btnSeleccionar.disabled = false;
    btnDetectarPoses.disabled = false;
}
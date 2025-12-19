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

    btnDetectarRostro.onclick = async function () {
        ctx.drawImage(imgPreview, 0, 0, canvas.width, canvas.height);
        var detector = await faceDetection.createDetector(modelo, { runtime: 'tfjs' });
        const faces = await detector.estimateFaces(imgPreview, { flipHorizontal: true });
        var nFaces = faces.length;
        var face, cuadro, ptosClave, x1, y1, ancho, alto;
        for (var i = 0; i < nFaces; i++) {
            face = faces[i];
            cuadro = face["box"];
            //ptosClave = face["keypoints"];
            console.log("cuadro: ", cuadro);
            console.log("ptosClave: ", ptosClave);
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.strokeWidth = 5;
            x1 = cuadro["xMin"];
            y1 = cuadro["yMin"];
            ancho = cuadro["width"];
            alto = cuadro["height"];
            ctx.rect(x1, y1, ancho, alto);
            ctx.stroke();
            ctx.closePath();
        }
    }

    btnNuevo.onclick = function () {
        txtArchivo.value = "";
        fupImagen.value = "";
        imgPreview.src = "";
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
    console.log("Cargando el Modelo MediaPipe FaceDetection...");
    modelo = await faceDetection.SupportedModels.MediaPipeFaceDetector;
    console.log("Modelo MediaPipe FaceDetection fue cargado");
    btnSeleccionar.disabled = false;
    btnDetectarRostro.disabled = false;
}
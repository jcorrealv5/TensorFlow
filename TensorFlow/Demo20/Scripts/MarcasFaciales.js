var detector;
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

    btnDetectarMarcasFaciales.onclick = async function () {
        canvas.width = imgPreview.width;
        canvas.height = imgPreview.height;
        ctx.drawImage(imgPreview, 0, 0, canvas.width, canvas.height);        
        const faces = await detector.estimateFaces(imgPreview, { flipHorizontal: false });
        var nFaces = faces.length;
        var face, cuadro, ptosClave, x1, y1, ancho, alto;
        const brocha = 1;
        const color = "blue";
        for (var i = 0; i < nFaces; i++) {
            face = faces[i];
            cuadro = face["box"];
            ptosClave = face["keypoints"];
            console.log("cuadro: ", cuadro);
            console.log("ptosClave: ", ptosClave);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.strokeWidth = 5;
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
    }

    btnNuevo.onclick = function () {
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
    console.log("Cargando el Modelo MediaPipe faceLandmarksDetection...");
    var modelo = await faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
        runtime: 'tfjs', // or 'mediapipe'
        maxFaces: 10
    }
    detector = await faceLandmarksDetection.createDetector(modelo, detectorConfig);
    console.log("Modelo MediaPipe faceLandmarksDetection fue cargado");
    btnSeleccionar.disabled = false;
    btnDetectarMarcasFaciales.disabled = false;
}
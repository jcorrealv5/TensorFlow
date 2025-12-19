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

    btnSegmentar.onclick = async function () {
        var objSegmentado = await modelo.segment(imgPreview);
        var mapaSegmentado = objSegmentado["segmentationMap"];
        var ancho = objSegmentado["width"];
        var alto = objSegmentado["height"];
        var dataMapaSegmentado = new ImageData(mapaSegmentado, ancho, alto);
        ctx.putImageData(dataMapaSegmentado, 0, 0);
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
    console.log("Cargando el Modelo deeplab...");
    var quantizationBytes = 2;
    modelo = await deeplab.load({ base: "pascal", quantizationBytes });
    console.log("Modelo deeplab fue cargado");
    btnSeleccionar.disabled = false;
    btnSegmentar.disabled = false;
}
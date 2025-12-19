var ctx;
var modelo;
var c = 0;
var total = 0;
var finVideo = false;
var idVideo;
var diccionario = {};

window.onload = async function () {
    ctx = canvas.getContext("2d");
    console.log("Cargando Modelo cocoSsd...");
    modelo = await cocoSsd.load();
    console.log("Modelo cocoSsd fue cargado");
    btnSeleccionar.disabled = false;
    btnDetectar.disabled = false;

    btnSeleccionar.onclick = function () {
        fupVideo.click();
    }

    fupVideo.onchange = function (evt) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            video.src = reader.result;            
        }
        reader.readAsDataURL(file);
    }

    btnDetectar.onclick = function () {
        finVideo = false;
        c = 0;
        total = 0;
        diccionario = {};
        video.play();
        idVideo = requestAnimationFrame(detectarObjetos);
    }

    btnNuevo.onclick = function () {
        ctx.fillStyle = "aqua";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        divMensaje.innerText = "";
        divRpta.innerHTML = "";
    }

    video.onended = function () {
        finVideo = true;
    }
}

async function detectarObjetos() {
    total++;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const objDetecciones = await modelo.detect(img);
    //console.log(objDetecciones);
    var nDetecciones = objDetecciones.length;
    var cuadro, ancho, alto, clase, prob;
    var umbral = +txtUmbral.value / 100;
    var claseBuscar = txtClaseBuscar.value.toLowerCase();
    var encontro = false;
    for (var i = 0; i < nDetecciones; i++) {
        cuadro = objDetecciones[i]["bbox"];
        clase = objDetecciones[i]["class"];
        prob = objDetecciones[i]["score"];
        if (!diccionario.hasOwnProperty(clase)) {
            diccionario[clase] = prob;
        }
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
        encontro = (clase.toLowerCase().indexOf(claseBuscar)>-1 && prob > umbral);
        if (encontro) break;
    }
    if (encontro) {
        var imagen = new Image(200, 200);
        imagen.src = canvas.toDataURL('image/png');
        imagen.onload = function () {      
            c++;
            divMensaje.innerText = claseBuscar + " encontrados: " + c + " de " + total;
            divRpta.appendChild(imagen);
        }        
    }
    if (!finVideo) idVideo = requestAnimationFrame(detectarObjetos);
    else {
        console.log(diccionario);
        divMensaje.innerText = claseBuscar + " encontrados: " + c + " de " + total;
        divRpta.appendChild(imagen);
        cancelAnimationFrame(idVideo);
    }
}
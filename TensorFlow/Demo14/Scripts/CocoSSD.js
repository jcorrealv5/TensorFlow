window.onload = async function () {    
    var ctx = canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Cargando Modelo cocoSsd...");
    const modelo = await cocoSsd.load();
    console.log("Modelo cocoSsd fue cargado");
    btnSeleccionar.disabled = false;
    btnDetectar.disabled = false;

    btnSeleccionar.onclick = function () {
        fupImagen.click();
    }

    fupImagen.onchange = function (event) {
        var file = this.files[0];
        txtArchivo.value = file.name;
        var reader = new FileReader();
        reader.onloadend = function (event) {            
            var img = new Image(canvas.width, canvas.height);
            img.src = reader.result;
            img.onload = function (evt) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }            
        }
        reader.readAsDataURL(file);
    }

    btnDetectar.onclick = async function () {
        var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const objDetecciones = await modelo.detect(img);
        console.log(objDetecciones);
        var nDetecciones = objDetecciones.length;
        spnMensaje.innerText = "Objetos Detectados: " + nDetecciones;
        var cuadro, ancho, alto;
        for (var i = 0; i < nDetecciones; i++) {
            cuadro = objDetecciones[i]["bbox"];
            ancho = Math.abs(cuadro[2] - cuadro[0]);
            alto = Math.abs(cuadro[3] - cuadro[1]);
            console.log(i, ancho, alto);
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.strokeWidth = 5;
            ctx.rect(cuadro[0], cuadro[1], ancho, alto);
            ctx.stroke();
            ctx.closePath();
        }
        crearTablaJson(objDetecciones, divDeteccion);
    }

    btnNuevo.onclick = function () {
        spnMensaje.innerText = "";
        txtArchivo.value = "";
        fupImagen.value = "";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        divDeteccion.innerHTML = "";
    }
}

function crearTablaJson(objJson, div) {
    var html = "";
    var nRegistros = objJson.length;
    if (nRegistros > 0) {
        html += "<table>";
        html += "<thead>";
        html += "<tr style='background-Color:black'>";
        var objFila = objJson[0];
        var campos = Object.keys(objFila);
        var nCampos = campos.length;
        for (var j = 0; j < nCampos; j++) {
            html += "<th style='width:300px;color:white'>";
            html += campos[j];
            html += "</th>";
        }
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";
        for (var i = 0; i < nRegistros; i++) {
            objFila = objJson[i];
            html += "<tr style='background-Color:white'>";
            for (var j = 0; j < nCampos; j++) {
                html += "<td style='color:black'>";
                html += objFila[campos[j]];
                html += "</td>";
            }
            html += "</tr>";
        }
        html += "</tbody>";
        html += "</table>";
    }
    div.innerHTML = html;
}
window.onload = async function () {
    console.log("Cargando Modelo mobilenet...");
    const version = 2;
    const alpha = 0.5;
    const modelo = await mobilenet.load({ version, alpha });
    console.log("Modelo mobilenet fue cargado");
    btnSeleccionar.disabled = false;
    btnClasificar.disabled = false;

    btnSeleccionar.onclick = function () {
        fupImagen.click();
    }

    fupImagen.onchange = function (event) {
        var file = this.files[0];
        txtArchivo.value = file.name;
        var reader = new FileReader();
        reader.onloadend = function (event) {
            imgPreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }

    btnClasificar.onclick = async function () {
        const objPredicciones = await modelo.classify(imgPreview);
        console.log('Predicciones');
        console.log(objPredicciones);
        crearTablaJson(objPredicciones, divClasificacion);
    }

    btnNuevo.onclick = function () {
        txtArchivo.value = "";
        fupImagen.value = "";
        imgPreview.src = "";
        divClasificacion.innerHTML = "";
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
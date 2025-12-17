var listaRpta = [];
var modelo;
var ctx;

window.onload = async function () {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Cargando Modelo mobilenet...");
    const version = 2;
    const alpha = 0.5;
    modelo = await mobilenet.load({ version, alpha });
    console.log("Modelo mobilenet fue cargado");

    window.ondragover = function (e) {
        e.preventDefault();
    }

    window.ondrop = function (e) {
        e.preventDefault();
    }

    canvas.ondragover = function (e) {
        e.preventDefault();
    }

    canvas.ondrop = function (e) {
        e.preventDefault();
        const files = [...e.dataTransfer.items]
            .map((item) => item.getAsFile())
            .filter((file) => file);
        mostrarArchivos(files);
    }
}

function mostrarArchivos(files) {
    listaRpta = [];
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var nFiles = files.length;
    var cFiles = 0;
    var posX = 0;
    var posY = 0;
    hSubtitulo.innerText = "Analizando " + nFiles + " Archivos";
    for (const file of files) {
        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.width = 200;
            img.height = 200;
            img.src = URL.createObjectURL(file);
            img.onload = async function (event) {
                //divPreview.appendChild(img);
                var objRpta = { "Nombre": "", "Probabilidad": 0 };
                const objPredicciones = await modelo.classify(img);
                if (objPredicciones.length > 0) {
                    objRpta["Nombre"] = objPredicciones[0]["className"];
                    objRpta["Probabilidad"] = objPredicciones[0]["probability"];
                }
                listaRpta.push(objRpta);
                ctx.font = "10px Arial";
                ctx.fillStyle = "blue";
                ctx.drawImage(img, posX, posY, 200, 200);
                ctx.fillText(objRpta["Nombre"], posX, posY + 10);
                ctx.fillText(objRpta["Probabilidad"], posX, posY + 190);
                posX += 200;
                cFiles++;
                if (posX == 800) {
                    posX = 0;
                    posY += 200;
                }
                if (cFiles == nFiles) crearTablaJson(listaRpta, divClasificacion);
            }
        }
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
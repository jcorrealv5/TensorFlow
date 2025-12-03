window.onload = function () {
    btnArchivoCSV.onclick = async function () {
        divPreview.innerHTML = "";
        var url = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/train-data.csv";
        var data = tf.data.csv(url);
        console.log("data: ", data);
        var columnas = await data.columnNames();
        console.log("Columnas: ", columnas);
        var matriz = [];
        await data.forEachAsync(objFila => {
            var aFila = [];
            for (var i = 0; i < columnas.length; i++) {
                valor = objFila[columnas[i]];
                aFila.push(+valor);
            }
            matriz.push(aFila);
            divPreview.insertAdjacentHTML("beforeEnd", aFila.join(",") + "<br>");
        });
        console.log("matriz: ", matriz);
        const tensorCsv = tf.tensor(matriz);
        console.log(tensorCsv);
        tensorCsv.print();
        tensorCsv.dispose();
    }

    btnArchivoImagen.onclick = async function () {
        var url = "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png";
        var rptaHttp = await fetch(url, {method: "GET"});
        if (rptaHttp.ok) {
            var rptaBlob = await rptaHttp.blob();
            if (rptaBlob.size > 0) {
                var blob = new Blob([rptaBlob], {"type":"image/png"});
                var img = new Image(700, 500);
                img.src = URL.createObjectURL(blob);
                img.onload = function (event) {
                    divPreview.innerHTML = "";
                    var tensorImagen = tf.browser.fromPixels(img, 4);
                    console.log(tensorImagen);
                    tensorImagen.print();
                    //divPreview.appendChild(img);
                    mostrarTensorImagen(tensorImagen);
                }
            }
        }
    }
}

async function mostrarTensorImagen(tensorImagen) {
    divPreview.innerHTML = "";
    var canvas = document.createElement("canvas");
    canvas.width = tensorImagen.shape[1];
    canvas.height = tensorImagen.shape[0];
    divPreview.appendChild(canvas);
    await tf.browser.toPixels(tensorImagen, canvas);
    tensorImagen.dispose();
}
var tensorTrainData, tensorTrainDataNorm;
var tensorTrainTarget, tensorTrainTargetNorm;
var tensorTestData, tensorTestDataNorm;
var tensorTestTarget, tensorTestTargetNorm;
var tensorTrain;
var columnas = [];
var columnasData;
var columnasTarget;
var modelo;

window.onload = async function () {
    btnObtenerData.onclick = function () {
        //Hay 333 Registros de Entrada con 12 Columnas para Entrenamiento
        var urlTrainData = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/train-data.csv";
        rptaTrainData = cargarDatos(urlTrainData);
        rptaTrainData.then((x) => {
            tensorTrainData = x.Tensor;
            tensorTrainData.print();
            columnasData = x.Columnas;
        });
        //Hay 333 Registros de Salida con 1 Columna para Entrenamiento
        var urlTrainTarget = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/train-target.csv";
        rptaTrainTarget = cargarDatos(urlTrainTarget);
        rptaTrainTarget.then((x) => {
            tensorTrainTarget = x.Tensor;
            tensorTrainTarget.print();
            columnasTarget = x.Columnas;
        });
        //Hay 173 Registros de Entrada con 12 Columnas para Pruebas
        var urlTestData = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/test-data.csv";
        rptaTestData = cargarDatos(urlTestData);
        rptaTestData.then((x) => {
            tensorTestData = x.Tensor;
            //tensorTestData.print();
        });
        //Hay 173 Registros de Salida con 1 Columna para Pruebas
        var urlTestTarget = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/test-target.csv";
        rptaTestTarget = cargarDatos(urlTestTarget);
        rptaTestTarget.then((x) => {
            tensorTestTarget = x.Tensor;
            //tensorTestTarget.print();
        });
    }

    btnMostrarData.onclick = function () {
        tensorTrain = tf.concat([tensorTrainData, tensorTrainTarget], 1);
        tensorTrain.print();
        columnas = [];
        for (var i = 0; i < columnasData.length;i++) {
            columnas.push(columnasData[i]);
        }
        for (var i = 0; i < columnasTarget.length; i++) {
            columnas.push(columnasTarget[i]);
        }
        mostrarTensorTrain();
    }

    btnGraficarData.onclick = async function () {
        await tensorTrain.array().then((arreglo) => {
            var serie = [];
            var series = ["Precio"];
            for (var i = 0; i < arreglo.length; i++) {
                serie[i] = { x: arreglo[i][5], y: arreglo[i][12]};
            }
            const data = { values: [serie], series }
            tfvis.render.scatterplot(divRpta, data);
        });
    }

    btnNormalizarData.onclick = function () {
        tensorTrainDataNorm = normalizarTensor(tensorTrainData);
        tensorTrainTargetNorm = normalizarTensor(tensorTrainTarget);
        tensorTestDataNorm = normalizarTensor(tensorTestData);
        tensorTestTargetNorm = normalizarTensor(tensorTestTarget);
        tensorTrainDataNorm.print();
        tensorTrainTargetNorm.print();
    }

    btnEntrenarModelo.onclick = async function () {
        modelo = tf.sequential();
        modelo.add(tf.layers.dense({ inputShape: [12], units: 1 }));
        modelo.summary();
        modelo.compile({ optimizer: tf.train.adam(), loss: 'meanSquaredError'});
        await modelo.fit(tensorTrainDataNorm, tensorTrainTargetNorm, {
            epochs: 3000,
            batchSize: 32,
            validationSplit: 0.1,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoca ${epoch}: Loss = ${logs.loss}, Val Loss = ${logs.val_loss}`);
                }
            }
        });
        const rptaGrabarModelo = await modelo.save('localstorage://RegresionLineal');
    }

    btnPredecir.onclick = function () {
        const tensorPrediccion = modelo.predict(tensorTestDataNorm);
        const residualSumOfSquares = tf.sum(tf.square(tf.sub(tensorTestTargetNorm, tensorPrediccion)));
        const totalSumOfSquares = tf.sum(tf.square(tf.sub(tensorTestTargetNorm, tf.mean(tensorTestTargetNorm))));
        const r2 = tf.sub(1, tf.div(residualSumOfSquares, totalSumOfSquares));
        r2.print();
    }
}

async function cargarDatos(url) {
    var data = tf.data.csv(url);
    var columnas = await data.columnNames();
    //console.log("Columnas: ", columnas);
    var matriz = [];
    await data.forEachAsync(objFila => {
        var aFila = [];
        for (var i = 0; i < columnas.length; i++) {
            valor = objFila[columnas[i]];
            aFila.push(+valor);
        }
        matriz.push(aFila);
    });
    return { "Tensor": tf.tensor(matriz), "Columnas": columnas };
}

async function mostrarTensorTrain() {
    var html = "<table style='width:100%'>";
    html += "<thead>";
    html += "<tr style='background-Color:blue;color:white'>";
    for (var j = 0; j < columnas.length; j++) {
        html += "<th style='width:100px'>";
        html += columnas[j];
        html += "</th>";
    }
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    await tensorTrain.array().then((arreglo) => {
        for (var i = 0; i < arreglo.length; i++) {
            html += "<tr style='background-Color:white;color:blue'>";
            for (var j = 0; j < arreglo[i].length; j++) {
                html += "<td>";
                html += arreglo[i][j];
                html += "</td>";
            }
            html += "</tr>";
        }
    });
    html += "</tbody>";
    html += "</table>";
    divRpta.innerHTML = html;
}

function normalizarTensor(tensor) {
    var tensorPromedio = tf.mean(tensor);
    const objMomento = tf.moments(tensor);
    const tensorVarianza = objMomento.variance;
    const tensorDesviacionEstandar = tensorVarianza.sqrt();
    const tensorNormalizado = tensor.sub(tensorPromedio).div(tensorDesviacionEstandar);
    return tensorNormalizado;
}
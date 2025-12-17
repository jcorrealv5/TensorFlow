window.onload = function () {
    btnEntrenarAnd.onclick = async function () {
        const tensorTrainX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        const tensorTrainY = tf.tensor2d([[0], [0], [0], [1]]);
        tf.tidy(await entrenar(tensorTrainX, tensorTrainY, "AND"));
    }

    btnEntrenarOr.onclick = async function () {
        const tensorTrainX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        const tensorTrainY = tf.tensor2d([[0], [1], [1], [1]]);
        tf.tidy(await entrenar(tensorTrainX, tensorTrainY, "OR"));
    }

    btnEntrenarXor.onclick = async function () {
        const tensorTrainX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        const tensorTrainY = tf.tensor2d([[0], [1], [1], [0]]);
        tf.tidy(await entrenar(tensorTrainX, tensorTrainY, "XOR"));
    }

    btnClasificarAnd.onclick = async function () {
        const tensorTestX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        tf.tidy(await clasificar(tensorTestX, "AND"));
    }

    btnClasificarOr.onclick = async function () {
        const tensorTestX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        tf.tidy(await clasificar(tensorTestX, "OR"));
    }

    btnClasificarXor.onclick = async function () {
        const tensorTestX = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        tf.tidy(await clasificar(tensorTestX, "XOR"));
    }
}

async function entrenar(tensorTrainX, tensorTrainY, operacion) {
    //Paso 1: Crear el Modelo
    const modelo = tf.sequential();
    modelo.add(tf.layers.dense({
        units: 4, inputShape: [2], activation: 'sigmoid'
    }));
    modelo.add(tf.layers.dense({
        units: 1, activation: 'sigmoid'
    }));
    //Paso 2: Compilar el modelo
    modelo.compile({
        optimizer: tf.train.adam(0.1),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });
    //Paso 3: Entrenar el modelo
    await modelo.fit(tensorTrainX, tensorTrainY, {
        epochs: 1000,
        callbacks: {
            onEpochEnd: async (epoca, logs) => {
                console.log(`Epoca ${epoca + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`);
                await tf.nextFrame();
            }
        }
    });
    const rptaGrabarModelo = await modelo.save('localstorage://' + operacion);
}

async function clasificar(tensorTestX, operacion) {
    const modelo = await tf.loadLayersModel('localstorage://' + operacion);
    tensorTestX.print();
    const tensorPredY = modelo.predict(tensorTestX);
    tensorPredY.print();
    const arreglo = tensorPredY.arraySync();
    var valores = [];
    for (var i = 0; i < arreglo.length; i++) {
        valores.push(Math.round(arreglo[i], 0));
    }
    console.log(operacion + ": ", valores.join(","));
}
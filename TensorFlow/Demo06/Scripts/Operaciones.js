window.onload = function () {
    btnSuma.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "int32");
            tensor.print();
            const tensorSuma = tf.sum(tensor);
            tensorSuma.print();
            const suma = tensorSuma.dataSync()[0];
            console.log("Suma: ", suma);
        });
    }

    btnPromedio.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "int32");
            tensor.print();
            const tensorPromedio = tf.mean(tensor);
            tensorPromedio.print();
            const promedio = tensorPromedio.dataSync()[0];
            console.log("Promedio: ", promedio);
        });
    }

    btnMinimo.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "int32");
            tensor.print();
            const tensorMinimo = tf.min(tensor);
            tensorMinimo.print();
            const minimo = tensorMinimo.dataSync()[0];
            console.log("Minimo: ", minimo);
        });
    }

    btnMaximo.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "int32");
            tensor.print();
            const tensorMaximo = tf.max(tensor);
            tensorMaximo.print();
            const maximo = tensorMaximo.dataSync()[0];
            console.log("Maximo: ", maximo);
        });
    }

    btnCuadrado.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "int32");
            tensor.print();
            const tensorCuadrado = tf.square(tensor);
            tensorCuadrado.print();
            const cuadrados = tensorCuadrado.dataSync();
            console.log("Cuadrados: ", cuadrados);
        });
    }

    btnRaizCuadrada.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "float32");
            tensor.print();
            const tensorRaizCuadrada = tf.sqrt(tensor);
            tensorRaizCuadrada.print();
            const raicesCuadradas = tensorRaizCuadrada.dataSync();
            console.log("Raices Cuadradas: ", raicesCuadradas);
        });
    }

    btnVarianza.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "float32");
            tensor.print();
            const objMomento = tf.moments(tensor);
            const tensorVarianza = objMomento.variance;
            tensorVarianza.print();
            const varianza = tensorVarianza.dataSync();
            console.log("Varianza: ", varianza);
        });
    }

    btnDesviacionEstandar.onclick = function () {
        tf.tidy(() => {
            const tensor = tf.tensor1d([1, 2, 3, 4, 5], "float32");
            tensor.print();
            const objMomento = tf.moments(tensor);
            const tensorVarianza = objMomento.variance;
            tensorVarianza.print();
            const tensorDesviacionEstandar = tensorVarianza.sqrt();
            const desviacionEstandar = tensorDesviacionEstandar.dataSync()[0];
            console.log("Desviacion Estandar: ", desviacionEstandar);
        });
    }
}
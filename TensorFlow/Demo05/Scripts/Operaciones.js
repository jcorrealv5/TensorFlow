window.onload = function () {
    btnSumarTensores.onclick = function () {
        const tensor1 = tf.tensor1d([1, 2, 3], "int32");
        tensor1.print();
        const tensor2 = tf.tensor1d([4, 5, 6], "int32");
        tensor2.print();
        const tensorSuma = tensor1.add(tensor2);
        tensorSuma.print();
        const numTensores = tf.memory().numTensors;
        console.log("Nro de tensores en Memoria: ", numTensores);
    }

    btnMultiplicarTensores.onclick = function () {
        const tensor1 = tf.tensor1d([1, 2, 3], "int32");
        tensor1.print();
        const tensor2 = tf.tensor1d([4, 5, 6], "int32");
        tensor2.print();
        const tensorProducto = tensor1.mul(tensor2);
        tensorProducto.print();
        const numTensores = tf.memory().numTensors;
        console.log("Nro de tensores en Memoria: ", numTensores);
    }

    btnProductoPunto.onclick = function () {
        const tensor1 = tf.tensor1d([1, 2, 3], "int32");
        tensor1.print();
        const tensor2 = tf.tensor1d([4, 5, 6], "int32");
        tensor2.print();
        const tensorProductoPto = tensor1.dot(tensor2);
        tensorProductoPto.print();
        const numTensores = tf.memory().numTensors;
        console.log("Nro de tensores en Memoria: ", numTensores);
    }

    btnLiberarTensorMemoria.onclick = function () {
        const tensor1 = tf.tensor1d([1, 2, 3], "int32");
        tensor1.print();
        const tensor2 = tf.tensor1d([4, 5, 6], "int32");
        tensor2.print();
        const tensorSuma = tensor1.add(tensor2);
        tensorSuma.print();
        const tensorProducto = tensor1.mul(tensor2);
        tensorProducto.print();
        const tensorProductoPto = tensor1.dot(tensor2);
        tensorProductoPto.print();
        const numTensoresAntes = tf.memory().numTensors;
        console.log("Nro de Bytes antes de Liberar Memoria: " + tf.memory().numBytes);
        console.log("Nro de tensores antes de Liberar Memoria: ", numTensoresAntes);
        tensor1.dispose();
        tensor2.dispose();
        tensorSuma.dispose();
        tensorProducto.dispose();
        tensorProductoPto.dispose();
        const numTensoresDespues = tf.memory().numTensors;
        console.log("Nro de Bytes despues de Liberar Memoria: " + tf.memory().numBytes);
        console.log("Nro de tensores despues de Liberar Memoria: ", numTensoresDespues);
    }

    btnLiberarBloqueMemoria.onclick = function () {
        tf.tidy(() => {
            const tensor1 = tf.tensor1d([1, 2, 3], "int32");
            tensor1.print();
            const tensor2 = tf.tensor1d([4, 5, 6], "int32");
            tensor2.print();
            const tensorSuma = tensor1.add(tensor2);
            tensorSuma.print();
            const tensorProducto = tensor1.mul(tensor2);
            tensorProducto.print();
            const tensorProductoPto = tensor1.dot(tensor2);
            tensorProductoPto.print();
            const numTensoresAntes = tf.memory().numTensors;
            console.log("Nro de Bytes antes de Liberar Memoria: " + tf.memory().numBytes);
            console.log("Nro de tensores antes de Liberar Memoria: ", numTensoresAntes);
        });
        const numTensoresDespues = tf.memory().numTensors;
        console.log("Nro de Bytes despues de Liberar Memoria: " + tf.memory().numBytes);
        console.log("Nro de tensores despues de Liberar Memoria: ", numTensoresDespues);
    }
}
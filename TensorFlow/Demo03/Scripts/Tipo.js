window.onload = function () {
    btnEscalar.onclick = function () {
        const escalar1 = tf.tensor(1);
        console.log(escalar1);
        escalar1.print();
        const escalar2 = tf.scalar(2);
        console.log(escalar2);
        escalar2.print();
    }

    btnTensor1D.onclick = function () {
        //Sin Shape ni Type: dtype=float32, shape=[5], size=5 
        const tensor1 = tf.tensor([1, 2, 3, 4, 5]);
        console.log(tensor1);
        tensor1.print();
        //Parametro Shape: dtype=float32, shape=[5], size=5 
        const tensor2 = tf.tensor([1, 2, 3, 4, 5], [5]);
        console.log(tensor2);
        tensor2.print();
        //Parametros Shape y Type: dtype=int32, shape=[5], size=5 
        const tensor3 = tf.tensor([1, 2, 3, 4, 5], [5], "int32");
        console.log(tensor3);
        tensor3.print();
        //Sin Type: dtype=float32, shape=[5], size=5 
        const tensor4 = tf.tensor1d([1, 2, 3, 4, 5]);
        console.log(tensor4);
        tensor4.print();
        //Parametro Type: dtype=int32, shape=[5], size=5
        const tensor5 = tf.tensor1d([1, 2, 3, 4, 5], "int32");
        console.log(tensor5);
        tensor5.print();
    }

    btnTensor2D.onclick = function () {
        //Sin Shape ni Type: dtype=float32, shape=[2,3], size=6 
        const tensor1 = tf.tensor([[1, 2, 3], [4, 5, 6]]);
        console.log(tensor1);
        tensor1.print();
        //Parametro Shape: dtype=float32, shape=[2,3], size=6 
        const tensor2 = tf.tensor([[1, 2, 3], [4, 5, 6]], [2,3]);
        console.log(tensor2);
        tensor2.print();
        //Parametros Shape y Type: dtype=int32, shape=[2,3], size=6
        const tensor3 = tf.tensor([[1, 2, 3], [4, 5, 6]], [2, 3], "int32");
        console.log(tensor3);
        tensor3.print();
        //Sin Shape ni Type: dtype=float32, shape=[2,3], size=6 
        const tensor4 = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
        console.log(tensor4);
        tensor4.print();
        //Parametro Shape: dtype=float32, shape=[2,3], size=6
        const tensor5 = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3]);
        console.log(tensor5);
        tensor5.print();
        //Parametros Shape y Type: dtype=int32, shape=[2,3], size=6
        const tensor6 = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3], "int32");
        console.log(tensor6);
        tensor6.print();
    }

    btnTensor3D.onclick = function () {
        //Sin Shape ni Type: dtype=float32, shape=[2,3,2], size=12
        const tensor1 = tf.tensor([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]]);
        console.log(tensor1);
        tensor1.print();
        //Parametro Shape: dtype=float32, shape=[2,3,2], size=12
        const tensor2 = tf.tensor([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], [2, 3, 2]);
        console.log(tensor2);
        tensor2.print();
        //Parametros Shape y Type: dtype=int32, shape=[2,3,2], size=12
        const tensor3 = tf.tensor([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], [2, 3, 2], "int32");
        console.log(tensor3);
        tensor3.print();
        //Sin Shape ni Type: dtype=float32, shape=[2,3,2], size=12
        const tensor4 = tf.tensor3d([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]]);
        console.log(tensor4);
        tensor4.print();
        //Parametro Shape: dtype=float32, shape=[2,3,2], size=12
        const tensor5 = tf.tensor3d([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], [2, 3, 2]);
        console.log(tensor5);
        tensor5.print();
        //Parametros Shape y Type: dtype=int32, shape=[2,3,2], size=12
        const tensor6 = tf.tensor3d([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], [2, 3, 2], "int32");
        console.log(tensor6);
        tensor6.print();
    }

    btnVariables.onclick = function () {
        var tensor1 = tf.tensor([1, 2, 3]);
        tensor1.print();
        tensor1 = tf.tensor([4, 5, 6]);
        tensor1.print();
        var tensor2 = tf.variable(tf.tensor([1, 2, 3]));
        tensor2.print();
        tensor2.assign(tf.tensor([4, 5, 6]));
        tensor2.print();
    }
}
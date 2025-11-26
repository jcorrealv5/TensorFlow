var c = 0;
var rpta = {};
var tensor1, tensor2;

window.onload = function () {
    btnEscalares.onclick = function () {
        var escalarTexto = tf.scalar("TensorFlow JS");
        var escalarDecimal = tf.scalar(3.2);
        escalarTexto.print();
        escalarDecimal.print();
        rpta = {};
        c = 0;
        escalarTexto.data().then(data => {
            rpta["Tensor Escalar Texto"] = data;
            c++;
            mostrarRespuesta(2);
        });
        escalarDecimal.data().then(data => {
            rpta["Tensor Escalar Decimal"] = data;
            c++;
            mostrarRespuesta(2);
        });
    }

    btnTensores.onclick = function () {
        tensor1 = tf.tensor([1, 2, 3]);
        tensor2 = tf.tensor([4, 5, 6]);
        rpta = {};
        c = 0;
        tensor1.data().then(data => {
            rpta["Tensor 1"] = data;
            c++;
            mostrarRespuesta(2);
        });
        tensor2.data().then(data => {
            rpta["Tensor 2"] = data;
            c++;
            mostrarRespuesta(2);
        });
    }

    btnSumar.onclick = function () {
        var suma = tensor1.add(tensor2);
        suma.data().then(data => {
            rpta["Suma"] = data;
            c++;
            mostrarRespuesta(3);
        });
    }

    btnMultiplicacion.onclick = function () {
        var producto = tensor1.mul(tensor2);
        producto.data().then(data => {
            rpta["Producto"] = data;
            c++;
            mostrarRespuesta(3);
        });
    }

    btnProductoPunto.onclick = function () {
        var productoPunto = tensor1.dot(tensor2);
        productoPunto.data().then(data => {
            rpta["Producto Punto"] = data;
            c++;
            mostrarRespuesta(3);
        });
    }
}

function mostrarRespuesta(x) {
    divRpta.innerHTML = "";
    if (c == x) {
        for (clave in rpta) {
            divRpta.innerHTML += clave + " = " + rpta[clave] + "<br>";
        }        
    }
}
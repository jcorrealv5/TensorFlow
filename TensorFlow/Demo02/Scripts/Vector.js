var arreglo1 = [];
var arreglo2 = [];

window.onload = function () {
    btnAgregarElemento1.onclick = function () {
        if (txtElementos.value > 0) {
            if (lstTensor1.options.length < txtElementos.value) {
                if (txtElementoTensor1.value != "") {
                    var elemento = document.createElement('option');
                    elemento.textContent = txtElementoTensor1.value;
                    elemento.value = txtElementoTensor1.value;
                    lstTensor1.appendChild(elemento);
                    arreglo1.push(+txtElementoTensor1.value);
                    txtElementoTensor1.value = "";                    
                }
                else alert("Ingresa un Elemento para la lista");
            }
            else alert("La lista de elementos del Tensor 1 ya esta completa");
        }
        else alert("Ingresa el Numero de Elementos del Tensor");
    }

    btnAgregarElemento2.onclick = function () {
        if (txtElementos.value > 0) {
            if (lstTensor2.options.length < txtElementos.value) {
                if (txtElementoTensor2.value != "") {
                    var elemento = document.createElement('option');
                    elemento.textContent = txtElementoTensor2.value;
                    elemento.value = txtElementoTensor2.value;
                    lstTensor2.appendChild(elemento);
                    arreglo2.push(+txtElementoTensor2.value);
                    txtElementoTensor2.value = "";                    
                }
                else alert("Ingresa un Elemento para la lista");
            }
            else alert("La lista de elementos del Tensor 2 ya esta completa");
        }
        else alert("Ingresa el Numero de Elementos del Tensor");
    }

    btnCalcular.onclick = function () {
        var tensor1 = tf.tensor(arreglo1);
        var tensor2 = tf.tensor(arreglo2);
        var suma = tensor1.add(tensor2);
        var producto = tensor1.mul(tensor2);
        var prodPunto = tensor1.dot(tensor2);
        mostrarItemsTensorLista(suma, lstSuma);
        mostrarItemsTensorLista(producto, lstProducto);
        mostrarItemsTensorLista(prodPunto, lstProdPunto);
    }

    btnNuevo.onclick = function () {
        arreglo1 = [];
        arreglo2 = [];
        txtElementos.value = "";
        lstTensor1.innerHTML = "";
        lstTensor2.innerHTML = "";
        lstSuma.innerHTML = "";
        lstProducto.innerHTML = "";
        lstProdPunto.innerHTML = "";
    }
}

function mostrarItemsTensorLista(tensor, controlLista) {
    controlLista.innerHTML = "";
    tensor.data().then(data => {
        for (var i = 0; i < data.length; i++) {
            var elemento = document.createElement('option');
            elemento.textContent = data[i];
            elemento.value = data[i];
            controlLista.appendChild(elemento);
        }
    });
}
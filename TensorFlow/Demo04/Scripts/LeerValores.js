window.onload = function () {
    const tensor = tf.tensor([[1, 2, 3], [4, 5, 6]], [2, 3], "int32"); 
    tensor.print();

    btnValoresSincrono.onclick = function () {
        this.disabled = true;
        //Valor Devuelto: Int32Array(n)
        const valores = tensor.dataSync();
        console.log(valores);
        this.disabled = false;
    }

    btnUnValorSincrono.onclick = function () {
        this.disabled = true;
        const valores = tensor.dataSync();
        const primerValor = valores[0];
        console.log(primerValor);
        this.disabled = false;
    }

    btnValoresAsincrono.onclick = function () {
        this.disabled = true;
        tensor.data().then((valores) => {
            console.log(valores);
            this.disabled = false;
        });        
    }

    btnUnValorAsincrono.onclick = function () {
        this.disabled = true;
        tensor.data().then((valores) => {
            const primerValor = valores[0];
            console.log(primerValor);
            this.disabled = false;
        });
    }

    btnArraySincrono.onclick = function () {
        this.disabled = true;
        const arreglo = tensor.arraySync();
        console.log(arreglo);
        this.disabled = false;
    }

    btnUnValorSincronoArray.onclick = function () {
        this.disabled = true;
        const arreglo = tensor.arraySync();
        const primerArray = arreglo[0];
        console.log(primerArray);
        this.disabled = false;
    }

    btnArrayAsincrono.onclick = function () {
        this.disabled = true;
        tensor.array().then((arreglo) => {
            console.log(arreglo);
            this.disabled = false;
        });
    }

    btnUnValorAsincronoArray.onclick = function () {
        this.disabled = true;
        tensor.array().then((arreglo) => {
            const primerArray = arreglo[0];
            console.log(primerArray);
            this.disabled = false;
        });
    }
}
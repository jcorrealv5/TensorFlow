window.onload = function () {
    btnSeleccionar.onclick = function () {
        fupArchivo.click();
    }

    fupArchivo.onchange = function (evt) {
        var file = this.files[0];
        txtArchivo.value = file.name;
        var campos = file.name.split(".");
        var nCampos = campos.length;
        var extension = campos[nCampos - 1].toLowerCase();
        if (extension == "csv") cargarCSV(file);
        if (extension == "jpg" || extension == "png") cargarImagen(file);
        if (extension == "mp3") cargarAudio(file);
    }
}

function cargarCSV(file) {
    var reader = new FileReader();
    reader.onloadend = function (event) {
        var texto = reader.result;
        divPreview.innerHTML = texto;
        const lineas = texto.trim().split('\n');
        const nLineas = lineas.length;
        var matriz = [];
        var campos = []
        var nCampos;
        var fila = [];
        for (var i = 1; i < nLineas; i++) {
            campos = lineas[i].split(",");
            nCampos = campos.length;
            fila = [];
            for (var j = 0; j < nCampos; j++) {
                fila.push(+campos[j]);
            }
            matriz.push(fila);
        }
        const tensorCsv = tf.tensor2d(matriz);
        console.log(tensorCsv);
        tensorCsv.print();
        tensorCsv.dispose();
    }
    reader.readAsText(file, "ISO-8859-1");
}

function cargarImagen(file) {
    var reader = new FileReader();
    reader.onloadend = function (event) {
        var base64 = reader.result;
        var img = new Image(700, 500);
        img.src = base64;
        img.onload = function (event) {
            divPreview.innerHTML = "";
            var tensorImagen = tf.browser.fromPixels(img, 4);
            console.log(tensorImagen);
            tensorImagen.print();
            //divPreview.appendChild(img);
            mostrarTensorImagen(tensorImagen);
        }
    }
    reader.readAsDataURL(file);
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

function cargarAudio(file) {
    var reader = new FileReader();
    reader.onloadend = async function (event) {
        const arrayBuffer = reader.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log(audioBuffer);
        const audioData = audioBuffer.getChannelData(0);
        const tensorAudio = tf.tensor(audioData);
        console.log(tensorAudio);
        tensorAudio.print();
        //Reproducir el audio desde el buffer
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    }
    reader.readAsArrayBuffer(file);
}
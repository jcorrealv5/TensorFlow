var tensorTrainX;
var tensorTrainY;

window.onload = function () {
    btnCrearDataSet.onclick = function () {
        crearTensorTrainX();
        crearTensorTrainY();        
    }

    btnEntrenarModelo.onclick = async function () {
        const modelo = tf.sequential();
        //Parte 1: Capas Convoluciones
        modelo.add(tf.layers.conv2d({
            inputShape: [28, 28, 1],
            kernelSize: 3,
            filters: 16,
            activation: 'relu'
        }));
        modelo.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
        modelo.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }));
        modelo.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
        modelo.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }));
        //Parte 2: Capas Densas o Conectadas
        modelo.add(tf.layers.flatten({}));
        modelo.add(tf.layers.dense({ units: 64, activation: 'relu' }));
        modelo.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
        modelo.summary();
        //Compilar el Modelo
        modelo.compile({
            optimizer: tf.train.adam(0.1),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
        //Entrenar el modelo
        await modelo.fit(tensorTrainX.reshape([65000, 28, 28, 1]), tensorTrainY, {
            epochs: 100,
            callbacks: {
                onEpochEnd: async (epoca, logs) => {
                    console.log(`Epoca ${epoca + 1}: Loss = ${logs.loss}, Accuracy = ${logs.acc}`);
                    await tf.nextFrame();
                }
            }
        });
        const rptaGrabarModelo = await modelo.save('localstorage://MNIST_100');
        alert("Modelo fue grabado al disco");
    }
}

function crearTensorTrainX() {
    var urlSprite = "https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png";
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var imgSprite = new Image();
    imgSprite.crossOrigin = "Anonymous";
    imgSprite.onload = async function () {
        imgSprite.width = this.naturalWidth;
        imgSprite.height = this.naturalHeight;
        ctx.drawImage(imgSprite, 0, 0, imgSprite.width, 500, 0, 0, imgSprite.width, 500);
        const datasetBytesBuffer = new ArrayBuffer(65000 * 784 * 4);
        for (var i = 0; i < 65000; i++) {
            const imageData = ctx.getImageData(0, i, 784, 1);
            const datasetBytesView = new Float32Array(datasetBytesBuffer, i * 784, 784);
            for (let j = 0; j < imageData.data.length / 4; j++) {
                datasetBytesView[j] = imageData.data[j * 4] / 255;
            }
            //const tensor = tf.tensor4d(datasetBytesView, [1, 784, 1, 1]);
            //const tensorImagen = tensor.reshape([28, 28, 1]);
            //tensorImagen.print();
            //await tf.browser.toPixels(tensorImagen, canvasImg);                        
        }
        const arreglo = new Float32Array(datasetBytesBuffer);
        //console.log(arreglo);
        tensorTrainX = tf.tensor4d(arreglo, [65000, 784, 1, 1]);
        tensorTrainX.print();
    }
    imgSprite.src = urlSprite;
}

async function crearTensorTrainY() {
    var urlEtiquetas = "https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8";
    var rptaHttp = await fetch(urlEtiquetas)
    if (rptaHttp.ok) {
        var rptaArray = await rptaHttp.arrayBuffer();
        var etiquetas = new Uint8Array(rptaArray);
        tensorTrainY = tf.tensor2d(etiquetas, [65000, 10]);
        tensorTrainY.print();
    }
}
'use strict';
var images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];


var productsArray = [];

var leftProductImage = document.getElementById('leftImage');
var centerProductImage = document.getElementById('centerImage');
var rightProductImage = document.getElementById('rightImage');

var leftProductText = document.getElementById('lefth2')
var centerProductText = document.getElementById('centerh2')
var rightProductText = document.getElementById('righth2')

var productSection = document.getElementById('allImages')

var trialsleft = 25;


// construction
function Products(name) {
    this.name = name.split('.')[0];
    this.url = 'img/' + name;
    this.counter = 0;
    this.views = 0;
    productsArray.push(this)
}


// function pick product

function pickImage() {



    do {
        var leftImage = Math.floor(Math.random() * (productsArray.length - 1))
        var centerImage = Math.floor(Math.random() * (productsArray.length - 1))
        var rightImage = Math.floor(Math.random() * (productsArray.length - 1))
    }
    while (rightImage === leftImage || rightImage === centerImage || centerImage === leftImage)



    renderImage(leftImage, centerImage, rightImage)

}

function checkProducts(objectIndicator) {
    for (var index = 0; index < productsArray.length; index++) {
        if (productsArray[index].url === objectIndicator) {
            productsArray[index].counter++;
            trialsleft--;
        }
    }
}

// counting

function countImages(event) {
    var targetId = event.target.id;
    if (trialsleft !== 0) {
        if (targetId === 'leftImage' || targetId === 'centerImage' || targetId === 'rightImage') {
            var objectIndicator = event.target.getAttribute('src');
            checkProducts(objectIndicator);
            pickImage();
        }

    }

    else {
        productSection.removeEventListener('click', countImages);

    }
}

// render Image
function renderImage(leftImage, centerImage, rightImage) {

    leftProductImage.setAttribute('src', productsArray[leftImage].url);
    centerProductImage.setAttribute('src', productsArray[centerImage].url);
    rightProductImage.setAttribute('src', productsArray[rightImage].url);

    leftProductImage.setAttribute('alt', productsArray[leftImage].url);
    centerProductImage.setAttribute('alt', productsArray[centerImage].url);
    rightProductImage.setAttribute('alt', productsArray[rightImage].url);


    leftProductText.textContent = productsArray[leftImage].name;
    centerProductText.textContent = productsArray[centerImage].name;
    rightProductText.textContent = productsArray[rightImage].name;

    productsArray[leftImage].views++
    productsArray[rightImage].views++
    productsArray[centerImage].views++


}


// show images

for (let i = 0; i < images.length; i++) {
    new Products(images[i])
}

pickImage();

productSection.addEventListener('click', countImages)

console.log(productsArray)

































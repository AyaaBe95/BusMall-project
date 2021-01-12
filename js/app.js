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
var productCanvas = document.getElementById('Chart');


var trialsleft = 25;
var shownImages = [];

var savedClicks = [];
var savedViews = [];



// construction
function Products(name) {
    this.name = name.split('.')[0];
    this.url = 'img/' + name;
    this.counter = 0;
    this.views = 0;
    productsArray.push(this)


}


function checkAvailability(selectedproducts) {
    for (let index = 0; index < shownImages.length; index++) {
        if (shownImages[index].name === selectedproducts) {
            return true;
        }

    }
    return false;

}


// function pick product

function pickImage() {


    do {
        var leftImage = Math.round(Math.random() * (productsArray.length - 1));
        var leftproductImageName = productsArray[leftImage].name;
    } while (checkAvailability(leftproductImageName))


    do {
        var rightImage = Math.round(Math.random() * (productsArray.length - 1));
        var rightproductImageName = productsArray[rightImage].name;
    } while (leftImage === rightImage || checkAvailability(rightproductImageName))

    do {
        var centerImage = Math.round(Math.random() * (productsArray.length - 1));
        var centerproductImageName = productsArray[rightImage].name;
    } while (leftImage === centerImage || rightImage === centerImage || checkAvailability(centerproductImageName))

    shownImages = [];

    shownImages.push(
        productsArray[leftImage],
        productsArray[centerImage],
        productsArray[rightImage]
    )

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
        storeData();
    }
}

var button = document.getElementById('showResults');
var ul = document.getElementById('items');

function showResults(event) {
    ul.innerHTML='';
    for (let index = 0; index < productsArray.length; index++) {
        var li = document.createElement('li');
        li.textContent = productsArray[index].name + " had " + productsArray[index].counter + " votes " + "and was seen " + productsArray[index].views + " times.";
        ul.appendChild(li);
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

var buttonChart = document.getElementById('showChart');
function renderChart(event) {
    var arrayOfproductsNames = [];
    var arrayOfproductsVotes = [];
    var arrayOfproductsShown = [];



    for (let index = 0; index < productsArray.length; index++) {
        arrayOfproductsNames.push(productsArray[index].name)
        arrayOfproductsVotes.push(productsArray[index].counter)
        arrayOfproductsShown.push(productsArray[index].views)

    }

    var myChart = new Chart(productCanvas, {
        type: 'bar',
        data: {
            labels: arrayOfproductsNames,
            datasets: [
                {
                    label: '# of products Clicks',
                    data: arrayOfproductsVotes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Time shown for the products',
                    data: arrayOfproductsShown,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}


// show images

for (let i = 0; i < images.length; i++) {
    new Products(images[i])
}


// storage

//for (i=0 ; i < productsArray.length ; i++){
//savedClicks[i] +=productsArray[i].counter;
//savedViews[i] +=productsArray[i].views;
//}


function storeData() {
    localStorage.setItem('clicksandviews', JSON.stringify(productsArray))
    //localStorage.setItem('views',JSON.stringify(savedClicks))
}

function checkAndRestore() {
    if (localStorage.length > 0) {
        productsArray = JSON.parse(localStorage.getItem('clicksandviews'));

    }
}




pickImage();
checkAndRestore();

productSection.addEventListener('click', countImages)
button.addEventListener('click', showResults);
buttonChart.addEventListener('click', renderChart);






































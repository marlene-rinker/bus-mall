'use strict';

// PD: Display three unique products by chance so the viewers can pick a favorite by clicking on it
//  after the user selects one, display three new products for the user to pick
// record each time a product is picked (clicked);
// the user should vote 25 times (should be a variable that can be changed for testing)
// generate a report after the user has finished voting that shows a list of all the products with the votes received and number of times the product was shown (Banana Slicer had 3 votes and was shown 5 times)



// Create a constructor function that creates an object associated with each product and put them in an array
function Product (name, imgSource, clickCount =0, displayedCount = 0){
  this.name = name;//used as the image id
  this.imgSource = imgSource;
  this.clickCount = clickCount;
  this.displayedCount = displayedCount;

  Product.allProducts.push(this);
}

Product.allProducts = [];// array to hold the products
Product.clicks = 0;
Product.maxVotes = 25;//number of votes the user can have - change back to 25
Product.random = [];


function putProductsInLocalStorage(){
  var stringyAllProducts = JSON.stringify(Product.allProducts);
  console.log('stringyAllProducts is ', stringyAllProducts);
  localStorage.setItem('productsInLocalStorage', stringyAllProducts);
}


// Create a function to display the product images and count when each product is displayed

Product.prototype.render = function(){

  this.displayedCount++;

  var target = document.getElementById('products');
  var newLi = document.createElement('li');

  var newImg = document.createElement('img');
  newImg.src = this.imgSource;
  newImg.id = this.name;
  newLi.appendChild(newImg);

  var newP = document.createElement('p');
  newP.textContent = this.name;
  newLi.appendChild(newP);

  target.appendChild(newLi);

};

function renderThankYou(){

  var target = document.getElementById('products');
  target.innerHTML = '';

  var message = document.getElementById('voting-message');
  message.textContent = 'Your votes have been counted. Thanks for voting!';

  // ulEl.removeEventListener('click', handleClickOnProduct);
}

// create a function to randomly generate three products and put them on the page


function putNewProductsOnPage(){
  var target = document.getElementById('products');
  target.innerHTML = ''; //clear out the products shown

  var lastArray = Product.random; //record the values of the last set of random numbers
  Product.random = [];
  var randoIndex;

  for (var i = 0; i < 3; i++){ //generate three new random images
    do {
      var randoIndex = Math.floor(Math.random() * Product.allProducts.length);
    }
    while (Product.random.includes(randoIndex) === true || lastArray.includes(randoIndex) === true);

    Product.random.push(randoIndex);
    Product.allProducts[randoIndex].render();

  }
  putProductsInLocalStorage();
}


// create a callback function that allows a user to vote a certain number of times for a product and counts when a product is clicked

function makeResultsChart(){
  var ctx = document.getElementById('resultsChart').getContext('2d');
  var i;
  var namesOfProducts = [];
  for (i = 0; i < Product.allProducts.length; i++){
    namesOfProducts.push(Product.allProducts[i].name);
  }

  var timesClicked = [];
  for (i = 0; i < Product.allProducts.length; i++){
    timesClicked.push(Product.allProducts[i].clickCount);
  }

  var max =0;

  var timesDisplayed = [];
  for (i = 0; i < Product.allProducts.length; i++){
    var counts = Product.allProducts[i].displayedCount;
    timesDisplayed.push(counts);
    if (counts > max){
      max = counts;
    }
  }
  Chart.defaults.global.defaultFontColor = 'rgb(8,0,138)';
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.defaultFontFamily = "'Sansita', sans-serif";
  var resultsChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: namesOfProducts,
      datasets: [{
        label: 'Number of Votes',
        data: timesClicked,
        backgroundColor: 'rgb(0,180,99)',
        borderColor: 'white',
        borderWidth: 2
      },
      {
        label: 'Number of Times Displayed',
        data: timesDisplayed,
        backgroundColor: 'rgb(250,203,97)',
        borderColor: 'white',
        borderWidth: 2

      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            max: max + 2
          }
        }],

        yAxes: [{
          stacked: true
        },
        ]
      }
    }
  });
}

function handleClickOnProduct(e){
  if (e.target.id){
    // console.log('i am still alive');


    if (Product.clicks < Product.maxVotes) {
      // console.log('event.target.id ' + e.target.id);

      for (var i = 0; i < Product.allProducts.length; i++){
        if(e.target.id === Product.allProducts[i].name){
          Product.allProducts[i].clickCount++;
        }
      }
      putProductsInLocalStorage();

      Product.clicks++;
      if (Product.clicks < Product.maxVotes){
        putNewProductsOnPage();
      }
      if (Product.clicks === Product.maxVotes){
        renderThankYou();
        makeResultsChart();
      }
    }
  }

}



function getProductsFromLocalStorage(){
  // get the array from local storage and use JSON.parse on it
  var stringAllProductsInStorage = localStorage.getItem('productsInLocalStorage');
  var jsAllProductsInStorage = JSON.parse(stringAllProductsInStorage);
  console.log('productsInLocalStorage after being parsed', jsAllProductsInStorage);

  for (var i =0; i < jsAllProductsInStorage.length; i++){
    var nameLS = jsAllProductsInStorage[i].name;
    var imgSource = jsAllProductsInStorage[i].imgSource;
    var clicksLS = jsAllProductsInStorage[i].clickCount;
    var displayedLS = jsAllProductsInStorage[i].displayedCount;

    new Product (nameLS, imgSource, clicksLS, displayedLS);
  }

}



// Use an event listener to listen for a a product to be clicked
var ulEl = document.getElementById('products');
ulEl.addEventListener('click', handleClickOnProduct);

// use an event listener to listen for the button to reset local storage to be clicked
// Nicco Ryan showed me how to create the button to reset local storage.
var resetStorageButton = document.getElementById('resetButton');
resetStorageButton.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});


// add products and put them on the page

if(localStorage.getItem('productsInLocalStorage')){
  getProductsFromLocalStorage();
}else {
  new Product('Bag', 'images/bag.jpg');
  new Product('Banana', 'images/banana.jpg');
  new Product('Bathroom', 'images/bathroom.jpg');
  new Product('Boots', 'images/boots.jpg');
  new Product('Breakfast', 'images/breakfast.jpg');
  new Product('Bubble Gum', 'images/bubblegum.jpg');
  new Product('Chair', 'images/chair.jpg');
  new Product('Cthulhu', 'images/cthulhu.jpg');
  new Product('Dog Duck', 'images/dog-duck.jpg');
  new Product('Dragon', 'images/dragon.jpg');
  new Product('Pen', 'images/pen.jpg');
  new Product('Pet Sweep', 'images/pet-sweep.jpg');
  new Product('Scissors', 'images/scissors.jpg');
  new Product('Shark', 'images/shark.jpg');
  new Product('Sweep', 'images/sweep.png');
  new Product('Tauntaun', 'images/tauntaun.jpg');
  new Product('Unicorn', 'images/unicorn.jpg');
  new Product('USB', 'images/usb.gif');
  new Product('Water Can', 'images/water-can.jpg');
  new Product('Wine Glass', 'images/wine-glass.jpg');
}


putNewProductsOnPage();






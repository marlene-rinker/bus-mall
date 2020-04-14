'use strict';

// PD: Display three unique products by chance so the viewers can pick a favorite by clicking on it
//  after the user selects one, display three new products for the user to pick
// record each time a product is picked (clicked);
// the user should vote 25 times (should be a variable that can be changed for testing)
// generate a report after the user has finished voting that shows a list of all the products with the votes received and number of times the product was shown (Banana Slicer had 3 votes and was shown 5 times)



// var allProducts = [];// array to hold the products

// Create a constructor function that creates an object associated with each product and put them in an array
function Product (name, imgSource){
  this.name = name;//used as the image id
  this.imgSource = imgSource;
  this.clickCount = 0;
  this.displayedCount = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];// array to hold the products
Product.clicks = 0;
Product.maxVotes = 6;//number of votes the user can have - change back to 25
Product.random = [];


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

  // newP = document.createElement('p');
  // newP.textContent = 'Clicked = ' + this.clickCount;
  // newLi.appendChild(newP);

  // newP = document.createElement('p');
  // newP.textContent = 'Displayed = ' + this.displayedCount;
  // newLi.appendChild(newP);

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

// function putNewProductsOnPage(){
//   var target = document.getElementById('products');
//   target.innerHTML = ''; //clear out the products shown

//   for (var i = 0; i < 3; i++){ //generate three new random images
//     var randoIndex = Math.floor(Math.random() * Product.allProducts.length);
//     Product.allProducts[randoIndex].render();//put the images on the page
//   }
// }

// function putNewProductsOnPage(){
//   var target = document.getElementById('products');
//   target.innerHTML = ''; //clear out the products shown

//   //  generate 3 different random numbers from the length of the Products.allProducts array
//   //    Step 1: generate a number, put it in an array (Product.random)
//   //    Step 2: generate another number, compare it to the numbers in the array
//   //    Step 3: if doesn't match, put it in the array, if does match discard it
//   //    repeat steps 2 and 3 until have 3 numbers in the array

//   Product.random = [];
//   for (var i = 0; i < 3; i++){ //generate three new random images
//     var randoIndex = Math.floor(Math.random() * Product.allProducts.length);
//     console.log('randoIndex is ' + randoIndex);
//     if (Product.random.includes(randoIndex) === false){
//       Product.random.push(randoIndex);
//     }else {
//       i--;
//     }
//     console.log('product random is ' + Product.random);

//   }
//   for (var j = 0; j < Product.random.length; j++){
//     var n = Product.random[j];
//     Product.allProducts[n].render();
//   }
// }

function putNewProductsOnPage(){
  var target = document.getElementById('products');
  target.innerHTML = ''; //clear out the products shown

  var lastArray = Product.random; //record the values of the last set of random numbers
  Product.random = [];
  for (var i = 0; i < 3; i++){ //generate three new random images
    var randoIndex = Math.floor(Math.random() * Product.allProducts.length);//generate a random number
    if (Product.random.includes(randoIndex) === false && lastArray.includes(randoIndex) === false){
      Product.random.push(randoIndex);
    }else {
      i--;//don't count this instance and try again
    }

  }

  for (var j = 0; j < Product.random.length; j++){
    var n = Product.random[j];
    Product.allProducts[n].render();
  }
  console.log('Product.random is ' +Product.random);
}



function putResultsOnPage(){


  var target = document.getElementById('results');


  for(var i = 0; i < Product.allProducts.length; i++){
    var newLi = document.createElement('li');
    newLi.textContent = Product.allProducts[i].name + ' had ' + Product.allProducts[i].clickCount + ' votes and was shown ' + Product.allProducts[i].displayedCount + ' times.';
    target.appendChild(newLi);
  }
}

// create a callback function that allows a user to vote a certain number of times for a product and counts when a product is clicked

function makeResultsChart(){
  var ctx = document.getElementById('resultsChart').getContext('2d');

  var namesOfProducts = [];
  for (var i = 0; i < Product.allProducts.length; i++){
    namesOfProducts.push(Product.allProducts[i].name);
  }

  var timesClicked = [];
  for (var i = 0; i < Product.allProducts.length; i++){
    timesClicked.push(Product.allProducts[i].clickCount);
  }

  var timesDisplayed = [];
  for (var i = 0; i < Product.allProducts.length; i++){
    timesDisplayed.push(Product.allProducts[i].displayedCount);
  }


  var resultsChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: namesOfProducts,
      datasets: [{
        label: 'Number of Votes',
        data: timesClicked,
        backgroundColor: 'grey',
        borderColor: 'orange',
        borderWidth: 3
      },
      {
        label: 'Number of Times Displayed',
        data: timesDisplayed,
        backgroundColor: 'pink',
        borderColor: 'darkblue',
        borderWidth: 3

      }]
    },
    options: {
      scales: {

        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
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
      Product.clicks++;
      if (Product.clicks < Product.maxVotes){
        putNewProductsOnPage();
      }
      if (Product.clicks === Product.maxVotes){
        renderThankYou();
        putResultsOnPage();
        makeResultsChart();
      }

    }
  }

}

// Use an event listener to listen for a a product to be clicked
var ulEl = document.getElementById('products');
ulEl.addEventListener('click', handleClickOnProduct);




// add products and put them on the page

new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('Bathroom', 'images/bathroom.jpg');
new Product('Boots', 'images/boots.jpg');
new Product('Breakfast', 'images/breakfast.jpg');
new Product('Bubble Gum', 'images/bubblegum.jpg');
// new Product('Chair', 'images/chair.jpg');
// new Product('Cthulhu', 'images/cthulhu.jpg');
// new Product('Dog Duck', 'images/dog-duck.jpg');
// new Product('Dragon', 'images/dragon.jpg');
// new Product('Pen', 'images/pen.jpg');
// new Product('Pet Sweep', 'images/pet-sweep.jpg');
// new Product('Scissors', 'images/scissors.jpg');
// new Product('Shark', 'images/shark.jpg');
// new Product('Sweep', 'images/sweep.png');
// new Product('Tauntaun', 'images/tauntaun.jpg');
// new Product('Unicorn', 'images/unicorn.jpg');
// new Product('USB', 'images/usb.gif');
// new Product('Water Can', 'images/water-can.jpg');
// new Product('Wine Glass', 'images/wine-glass.jpg');



putNewProductsOnPage();




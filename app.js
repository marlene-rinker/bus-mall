'use strict';

// PD: Display three unique products by chance so the viewers can pick a favorite by clicking on it
//  after the user selects one, display three new products for the user to pick
// record each time a product is picked (clicked);
// the user should vote 25 times (should be a variable that can be changed for testing)
// generate a report after the user has finished voting that shows a list of all the products with the votes received and number of times the product was shown (Banana Slicer had 3 votes and was shown 5 times)



var allProducts = [];// array to hold the products

// Create a constructor function that creates an object associated with each product and put them in an array
function Product (name, imgSource){
  this.name = name;
  this.imgSource = imgSource;
  this.clickCount = 0;
  this.displayedCount = 0;

  allProducts.push(this);
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

}

// create a function to randomly generate three products and put them on the page

function putNewProductsOnPage(){
  var target = document.getElementById('products');
  target.innerHTML = ''; //clear out the products shown

  for (var i = 0; i < 3; i++){ //generate three new random images
    var randoIndex = Math.floor(Math.random() * allProducts.length);
    allProducts[randoIndex].render();//put the images on the page
  }
}

function putResultsOnPage(){


  var target = document.getElementById('results');


  for(var i = 0; i < allProducts.length; i++){
    var newLi = document.createElement('li');
    // newLi.textContent = allProducts[i].name + ' was shown ' + allProducts[i].displayedCount + ' times and clicked ' + allProducts[i].clickCount + ' times.';
    newLi.textContent = allProducts[i].name + ' had ' + allProducts[i].clickCount + ' votes and was shown ' + allProducts[i].displayedCount + ' times.';
    target.appendChild(newLi);
  }
}

// create a callback function that allows a user to vote a certain number of times for a product and counts when a product is clicked

var clicks = 0;
var maxVotes = 25;//number of votes the user can have

function handleClickOnProduct(e){
  if (e.target.id){


    if (clicks < maxVotes) {
      // console.log('you clicked me ' + clicks);
      // console.log('event target ' + e.target);
      // console.log('event.target.id ' + e.target.id);

      for (var i = 0; i < allProducts.length; i++){
        if(e.target.id === allProducts[i].name){
          allProducts[i].clickCount++;
        }
      }
      clicks++;
      if (clicks < maxVotes){
        putNewProductsOnPage();
      }
      if (clicks === maxVotes){
        renderThankYou();
        putResultsOnPage();
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



putNewProductsOnPage();




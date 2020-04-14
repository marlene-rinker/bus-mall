'use strict';

// PD: Display three unique products by chance so the viewers can pick a favorite by clicking on it
//  after the user selects one, display three new products for the user to pick
// record each time a product is picked (clicked);
// the user should vote 25 times (should be a variable that can be changed for testing)
// generate a report after the user has finished voting that shows a list of all the products with the votes received and number of times the product was shown (Banana Slicer had 3 votes and was shown 5 times)


// display products (3 at a time)
// click on a product and it gets counted
// show new products
// repeat 25 times
// generate a report with the results (in a list)

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

  newP = document.createElement('p');
  newP.textContent = 'Clicked = ' + this.clickCount;
  newLi.appendChild(newP);

  newP = document.createElement('p');
  newP.textContent = 'Displayed = ' + this.displayedCount;
  newLi.appendChild(newP);

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

// create a callback function that allows a user to vote a certain number of times for a product and counts when a product is clicked

var clicks = 1;
var maxVotes = 6;//this should be changed to 25 later

function handleClickOnProduct(e){
  if (e.target.id){


    if (clicks < maxVotes) {
      console.log('you clicked me ' + clicks);
      console.log('event target ' + e.target);
      console.log('event.target.id ' + e.target.id);

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
        console.log('product 1 was shown ' + allProducts[0].displayedCount + ' and was clicked ' + allProducts[0].clickCount + ' time(s)');
        renderThankYou();
        // clear images and put thank you for playing message instead
      }

    }
  }

}

// Use an event listener to listen for a a product to be clicked
var ulEl = document.getElementById('products');
ulEl.addEventListener('click', handleClickOnProduct);




new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('Bathroom', 'images/bathroom.jpg');

console.log(allProducts);

putNewProductsOnPage();




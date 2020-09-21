
let carts = document.querySelectorAll('.add-cart');


let products=[
		{
	name:'Grey Tshirt',
	tag:'greytshirt',
	price:15,
	inCart:0
},
{
	name:'Grey Hoddie',
	tag:'greyhoodie',
	price:20,
	inCart:0
},
{
    name:'Black Tshirt',
	tag:'blacktshirt',
	price:10,
	inCart:0
},
{
    name:'Black Hoodie',
	tag:'blackhoodie',
	price:25,
	inCart:0
}
];



for (let i = 0; i < carts.length; i++){
	/*console.log("my loop"); */
	carts[i].addEventListener('click', () => {
     /*console.log("added to cart") */
     cartNumbers(products[i]);
     totalCost(products[i]);
})
}


function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');

if(productNumbers){
document.querySelector('.cart span').textContent =productNumbers;
}
}

function cartNumbers(product) {
	/*console.log("the product clicked is ",product);*/
	let productNumbers = localStorage.getItem('cartNumbers');
	/*console.log(productNumbers);
	console.log(typeof productNumbers);*/
	
productNumbers = parseInt(productNumbers);
/*console.log(typeof productNumbers); */
/* console.log(productNumbers)*/

if(productNumbers ) {
localStorage.setItem('cartNumbers', productNumbers + 1);
document.querySelector('.cart span').textContent = productNumbers + 1;

}   else {
localStorage.setItem('cartNumbers', 1);
document.querySelector('.cart span').textContent = 1;
}
setItems(product);
}

function setItems(product){
	/*console.log("inside of setItems function");
	console.log("my product is", product); */
 
let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);


if(cartItems != null){
	
	if(cartItems[product.tag] == undefined){
	cartItems = {
		...cartItems,
		[product.tag]: product
	}
}
	cartItems[product.tag].inCart += 1;

} else {
	product.inCart = 1;
	cartItems = {
		[product.tag]: product
	}
}

/*console.log("My cartCost is", cartCost);*/
/*console.log("My cartItems", cartItems);*/
localStorage.setItem("productsInCart", JSON.stringify 
(cartItems));
}
function totalCost(product){
//console.log("the product price is", product.price);
let cartCost = localStorage.getItem('totalCost');
console.log("My cartCost is", cartCost);
console.log(typeof cartCost);


if(cartCost !=null){
	cartCost =parseInt(cartCost);
	
	localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost",product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
		   
	let productContainer = document.querySelector
	(".products");
	let cartCost = localStorage.getItem('totalCost');

console.log(cartItems);
	if( cartItems && productContainer ){
    productContainer.innerHTML = '';
Object.values(cartItems).map(item => {
	productContainer.innerHTML += `

<div class="product">
	<ion-icon name="close-circle-outline"></ion-icon>
    <img src="./images/${item.tag}.jpg">
	<span>${item.name}</span>
</div>

<div class="price">${item.price},00</div>
<div class="quantity">
<ion-icon class="decrease"
<ion-icon name="caret-back-outline"></ion-icon>
<span>${item.inCart}</span>

<ion-icon class="increase "
<ion-icon name="caret-forward-outline"></ion-icon>
</div>

<div class="total">
$${item.inCart * item.price}.00 total
</div>

`;
});
productContainer.innerHTML += `
<div class="basketTotalContainer">
<h4 class="basketTotalTitle">
Basket Total
</h4>
<h4 class="basketTotal">

$${cartCost},00
</h4>
`;
}
}
onLoadCartNumbers();
displayCart();
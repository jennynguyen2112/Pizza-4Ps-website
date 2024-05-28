let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Assorted House-made Cheese',
        image: 'appetizer1.jpg',
        price: 10
    },
    {
        id: 2,
        name: 'Cold Cuts and Cheese Platter',
        image: 'appetizer2.jpg',
        price: 11
    },
    {
        id: 3,
        name: 'Mango Parma Ham Wrap',
        image: 'appetizer3.jpg',
        price: 11
    },
    {
        id: 4,
        name: 'Butternut Pumpkin and Jasmine Milk Tea Potage',
        image: 'appetizer4.jpg',
        price: 13
    },
    {
        id: 5,
        name: 'Seafood Okonomiyaki Pizza',
        image: 'pizza1.jpg',
        price: 15
    },
    {
        id: 6,
        name: 'Burrata Parma Ham',
        image: 'pizza2.png',
        price: 17
    },
    {
        id: 7,
        name: 'House-made 3 Cheese Pizza',
        image: 'pizza3.jpg',
        price: 16
    },
    {
        id: 8,
        name: 'House-made 4 Cheese Pizza',
        image: 'pizz4.jpg',
        price: 16
    },
    {
        id: 9,
        name: 'Arrabbiata with Mascarpone',
        image: 'pasta1.jpg',
        price: 18
    },
    {
        id: 10,
        name: 'Clam & Basil Sauce Spaghetti',
        image: 'pasta2.jpg',
        price: 18
    },
    {
        id: 11,
        name: 'Salmon Cream Fettuccine',
        image: 'pasta3.jpg',
        price: 18
    },
    {
        id: 12,
        name: 'Bolognese Spaghetti',
        image: 'pasta4.jpg',
        price: 18
    }
];
let listCarts  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item'); 
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCart(key){
    if(listCarts[key] == null){
        // copy product form list to list cart
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart();
}
function reloadCart(){
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCart.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    }else{
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}
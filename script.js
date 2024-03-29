const menu =document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarning = document.getElementById('address-warn');

let cart = [];

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

menu.addEventListener('click', (e) => {
    let parentButton = e.target.closest('.add-to-cart-btn');

    if(parentButton) {
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));

        addToCart(name, price);
    }
});

function addToCart(name, price) {

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity+= 1;
    }

    cart.push({name, price, quantity: 1});
}
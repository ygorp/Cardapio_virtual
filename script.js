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
    updateCartModal();
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
    } else {
        cart.push({name, price, quantity: 1});
    }

    updateCartModal();
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');
        itemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex flex-col">
                    <span class="font-medium">${item.name}</span>
                    <span>Qtd: ${item.quantity}</span>
                    <span class="font-medium mt-2">${item.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotal.innerText = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    cartCounter.innerText = cart.length;
}

cartItemsContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('remove-from-cart-btn')) {
        const name = e.target.getAttribute('data-name');
        removeFromCart(name);
    }

});

function removeFromCart(name) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        cart[index].quantity -= 1;

        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }

        updateCartModal();
    }
}

/*!
* Start Bootstrap - Agency v7.0.12
*/

window.addEventListener('DOMContentLoaded', () => {
    // -----------------------------
    // EXISTING NAVBAR SCRIPT
    // -----------------------------
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.forEach(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none'
            ) {
                navbarToggler.click();
            }
        });
    });

    // -----------------------------
    // CART SYSTEM
    // -----------------------------
    const CART_STORAGE_KEY = 'creative-lounge-cart';
    let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    function saveCart() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }

    function getCartItemCount() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function renderCart() {
        if (!cartItemsEl || !cartTotalEl || !cartCountEl) return;

        cartItemsEl.innerHTML = '';

        if (cart.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.className = 'list-group-item text-muted';
            emptyItem.textContent = 'Your cart is empty.';
            cartItemsEl.appendChild(emptyItem);
        } else {
            cart.forEach((item) => {
                const li = document.createElement('li');
                li.className = 'list-group-item';

                li.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                            <div class="fw-bold">${item.name}</div>
                            <small class="text-muted">$${item.price.toFixed(2)} each</small>
                        </div>

                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary decrease-btn" data-name="${item.name}" type="button">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary increase-btn" data-name="${item.name}" type="button">+</button>
                            <button class="btn btn-sm btn-outline-danger remove-btn" data-name="${item.name}" type="button">Remove</button>
                        </div>
                    </div>
                `;

                cartItemsEl.appendChild(li);
            });
        }

        cartCountEl.textContent = getCartItemCount();
        cartTotalEl.textContent = getCartTotal().toFixed(2);
        saveCart();
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        renderCart();
    }

    function increaseQuantity(name) {
        const item = cart.find(item => item.name === name);
        if (!item) return;

        item.quantity += 1;
        renderCart();
    }

    function decreaseQuantity(name) {
        const item = cart.find(item => item.name === name);
        if (!item) return;

        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.name !== name);
        }

        renderCart();
    }

    function removeItem(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    function clearCart() {
        cart = [];
        renderCart();
    }

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            if (!name || Number.isNaN(price)) return;

            addToCart(name, price);
        });
    });

    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('increase-btn')) {
                increaseQuantity(target.dataset.name);
            }

            if (target.classList.contains('decrease-btn')) {
                decreaseQuantity(target.dataset.name);
            }

            if (target.classList.contains('remove-btn')) {
                removeItem(target.dataset.name);
            }
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    renderCart();
});
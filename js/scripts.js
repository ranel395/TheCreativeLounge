/*!
* Start Bootstrap - Agency v7.0.12
*/

// -----------------------------
// EXISTING NAVBAR SCRIPT
// -----------------------------

window.addEventListener('DOMContentLoaded', event => {

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
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

    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// -----------------------------
// CART SYSTEM
// -----------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// Update cart display
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.innerText = total.toFixed(2);

    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Add item to cart
function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}


// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}


// Initialize cart on page load
updateCart();
// script.js – AKA Gaming Store v1.5

let cart = [];
let products = [];

// Load products from JSON
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;
  productGrid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} AED</p>
      <p>${product.stock > 0 ? `<span class='in-stock'>In stock</span>` : `<span class='out-stock'>Out of stock</span>`}</p>
      <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product || product.stock === 0) return;

  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  if (!cartList || !cartTotal) return;

  cartList.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.qty} - ${item.price * item.qty} AED <button onclick="removeFromCart(${item.id})">Remove</button>`;
    cartList.appendChild(li);
  });

  const discount = subtotal >= 500 ? subtotal * 0.15 : 0;
  const vat = (subtotal - discount >= 5000) ? 0 : (subtotal - discount) * 0.05;
  const total = subtotal - discount + vat;

  cartTotal.innerHTML = `
    Subtotal: ${subtotal.toFixed(2)} AED<br>
    Discount: -${discount.toFixed(2)} AED<br>
    VAT (5%): ${vat.toFixed(2)} AED<br>
    <strong>Total: ${total.toFixed(2)} AED</strong>
  `;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[name="email"]').value;
    alert(`Subscribed with ${email}`); // Replace with Formspree logic if needed
  });
}

// Navigation Highlight
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  if (window.location.href.includes(link.getAttribute('href')))
    link.classList.add('active');
});

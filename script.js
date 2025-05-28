// ✅ script.js (v1.5 unified logic)

// Load and display products
fetch('products.json')
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById('product-container');
    if (container) {
      container.innerHTML = products.map((p) => `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <strong>${p.price} AED</strong>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `).join('');
    }
  });

// Add to Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(id) {
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

// Display Cart Items and Checkout Logic
function renderCart() {
  const cartList = document.getElementById('cart-items');
  const totalBox = document.getElementById('checkout-total');
  const vatBox = document.getElementById('checkout-vat');
  const discountBox = document.getElementById('checkout-discount');

  fetch('products.json')
    .then((res) => res.json())
    .then((products) => {
      const items = cart.map((id) => products.find((p) => p.id === id));
      let subtotal = items.reduce((sum, item) => sum + item.price, 0);

      let discount = subtotal >= 500 ? 0.15 * subtotal : 0;
      let vat = subtotal >= 5000 ? 0 : 0.05 * (subtotal - discount);
      let total = subtotal - discount + vat;

      if (cartList) {
        cartList.innerHTML = items.map((item) => `<li>${item.name} - ${item.price} AED</li>`).join('');
      }

      if (discountBox) discountBox.innerText = `- ${discount.toFixed(2)} AED`;
      if (vatBox) vatBox.innerText = `+ ${vat.toFixed(2)} AED`;
      if (totalBox) totalBox.innerText = `${total.toFixed(2)} AED`;
    });
}

if (document.getElementById('cart-items')) {
  renderCart();
}

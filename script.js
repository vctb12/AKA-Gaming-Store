let cart = [];
const VAT_RATE = 0.05;
const DISCOUNT_THRESHOLD = 500;
const DISCOUNT_CODE = 'AKA15';

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function updateCart() {
  let subtotal = cart.reduce((sum, p) => sum + p.price, 0);
  let discount = (subtotal >= DISCOUNT_THRESHOLD) ? 0.15 * subtotal : 0;
  let afterDiscount = subtotal - discount;
  let vat = afterDiscount >= 5000 ? 0 : afterDiscount * VAT_RATE;
  let total = afterDiscount + vat;

  console.log(`Total: ${total} AED`);
}

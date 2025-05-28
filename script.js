

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav ul li a");
  const path = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (path.endsWith(href)) {
      link.classList.add("active");
    }
  });
});


// VAT + Discount Logic
function calculateTotals(subtotal, promoCode) {
  let discount = 0;
  if (promoCode === "AKA15" && subtotal >= 500) {
    discount = subtotal * 0.15;
  }

  let vat = (subtotal - discount) * 0.05;
  if (subtotal - discount > 5000) {
    vat = 0;
  }

  const total = subtotal - discount + vat;

  return {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    vat: vat.toFixed(2),
    total: total.toFixed(2)
  };
}

// Example usage:
// const summary = calculateTotals(520, "AKA15");
// console.log(summary); // For testing

// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Select DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to render products
function renderProducts() {
  products.forEach(product => {
    const productItem = document.createElement("li");
    productItem.textContent = `${product.name} - $${product.price} `;
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    productItem.appendChild(addButton);
    productList.appendChild(productItem);
  });
}

// Function to add a product to the cart
function addToCart(product) {
  // Check if product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Function to render the cart
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart items

  cart.forEach(item => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${item.name} - $${item.price} (Qty: ${item.quantity})`;
    cartList.appendChild(cartItem);
  });
}

// Function to update cart (in both UI and session storage)
function updateCart() {
  renderCart();
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
}

// Function to clear the cart
function clearCart() {
  cart = []; // Empty the cart array
  updateCart(); // Update the UI and session storage
}

// Attach event listener to Clear Cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial setup
renderProducts();
updateCart();

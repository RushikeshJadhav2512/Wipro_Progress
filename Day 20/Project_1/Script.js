// QuickCart Utility Module

const QuickCart = {

    // 1. Display Messages
    showMessage(message, type = "info") {
        console.log(`[${type.toUpperCase()}]: ${message}`);
    },

    // 2. Price Calculations
    calculateTotal(price, quantity) {
        return price * quantity;
    },

    applyDiscount(total, discountPercent) {
        return total - (total * discountPercent / 100);
    },

    addTax(amount, taxPercent) {
        return amount + (amount * taxPercent / 100);
    },

    // 3. Process Product Lists
    filterByCategory(products, category) {
        if (category === 'All') {
            return products;
        }
        return products.filter(p => p.category === category);
    },

    getCartTotal(products) {
        return products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    },

    findProductById(products, id) {
        return products.find(p => p.id === id);
    },

    // 4. Object Creation
    createProduct(id, name, price, category, quantity = 1) {
        return { id, name, price, category, quantity };
    }
};

// Create Products
let p1 = QuickCart.createProduct(1, "Laptop", 50000, "Electronics", 1);
let p2 = QuickCart.createProduct(2, "Mouse", 500, "Electronics", 2);
let p3 = QuickCart.createProduct(3, "Notebook", 100, "Stationery", 5);

let cart = [p1, p2, p3];

QuickCart.showMessage("Products added to cart", "success");

// DOM Functions
function displayProducts() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    cart.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toLocaleString()}</p>
            <span class="category">${product.category}</span>
            <p class="quantity">Quantity: ${product.quantity}</p>
        `;
        productsList.appendChild(card);
    });
}

function displayCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
        `;
        cartList.appendChild(itemDiv);
    });

    updateCartSummary();
}

function updateCartSummary() {
    let total = QuickCart.getCartTotal(cart);
    const subtotal = total;

    const discount = total * 0.10;
    total = QuickCart.applyDiscount(total, 10);

    const tax = total * 0.18;
    total = QuickCart.addTax(total, 18);

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('discount').textContent = `-₹${discount.toLocaleString()}`;
    document.getElementById('afterDiscount').textContent = `₹${(subtotal - discount).toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('finalTotal').textContent = `₹${total.toLocaleString()}`;
}

function filterProducts(category) {
    const filteredProducts = QuickCart.filterByCategory(cart, category);
    const filteredList = document.getElementById('filteredProducts');
    filteredList.innerHTML = '';

    if (filteredProducts.length === 0) {
        filteredList.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toLocaleString()}</p>
            <span class="category">${product.category}</span>
            <p class="quantity">Quantity: ${product.quantity}</p>
        `;
        filteredList.appendChild(card);
    });

    console.log(`${category} Products:`, filteredProducts);
}

function searchProduct() {
    const searchId = parseInt(document.getElementById('searchId').value);
    const searchResult = document.getElementById('searchResult');

    if (isNaN(searchId)) {
        searchResult.innerHTML = '<p class="not-found">Please enter a valid product ID.</p>';
        return;
    }

    const product = QuickCart.findProductById(cart, searchId);

    if (product) {
        searchResult.innerHTML = `
            <p class="found">Product Found!</p>
            <p><strong>ID:</strong> ${product.id}</p>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> ₹${product.price.toLocaleString()}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Quantity:</strong> ${product.quantity}</p>
        `;
        console.log('Product with ID', searchId + ':', product);
    } else {
        searchResult.innerHTML = `<p class="not-found">Product with ID ${searchId} not found.</p>`;
        console.log('Product with ID', searchId, ':', undefined);
    }
}

// Console outputs as per original code
let total = QuickCart.getCartTotal(cart);
console.log("Cart Total:", total);

total = QuickCart.applyDiscount(total, 10);
console.log("After 10% Discount:", total);

total = QuickCart.addTax(total, 18);
console.log("After 18% Tax:", total);

console.log("Electronics Products:",
    QuickCart.filterByCategory(cart, "Electronics")
);

console.log("Product with ID 2:",
    QuickCart.findProductById(cart, 2)
);

// Initialize DOM on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
    filterProducts('All');
});

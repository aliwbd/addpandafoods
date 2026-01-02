// Restaurant data
const restaurants = [
    {
        id: 1,
        name: "Pizza Palace",
        cuisine: "Italian, Pizza",
        rating: 4.5,
        deliveryTime: "25-35 min",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        menu: [
            { id: 101, name: "Margherita Pizza", price: 12.99 },
            { id: 102, name: "Pepperoni Pizza", price: 14.99 },
            { id: 103, name: "Garlic Bread", price: 5.99 }
        ]
    },
    {
        id: 2,
        name: "Burger Hub",
        cuisine: "American, Burgers",
        rating: 4.3,
        deliveryTime: "20-30 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
        menu: [
            { id: 201, name: "Classic Cheeseburger", price: 9.99 },
            { id: 202, name: "Double Bacon Burger", price: 13.99 },
            { id: 203, name: "French Fries", price: 4.99 }
        ]
    },
    {
        id: 3,
        name: "Sushi Master",
        cuisine: "Japanese, Sushi",
        rating: 4.7,
        deliveryTime: "30-40 min",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        menu: [
            { id: 301, name: "Salmon Roll", price: 8.99 },
            { id: 302, name: "Dragon Roll", price: 14.99 },
            { id: 303, name: "Miso Soup", price: 3.99 }
        ]
    },
    {
        id: 4,
        name: "Thai Spice",
        cuisine: "Thai, Asian",
        rating: 4.6,
        deliveryTime: "35-45 min",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        menu: [
            { id: 401, name: "Pad Thai", price: 11.99 },
            { id: 402, name: "Green Curry", price: 12.99 },
            { id: 403, name: "Spring Rolls", price: 6.99 }
        ]
    },
    {
        id: 5,
        name: "Sweet Treats",
        cuisine: "Desserts, Bakery",
        rating: 4.4,
        deliveryTime: "20-30 min",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        menu: [
            { id: 501, name: "Chocolate Cake", price: 7.99 },
            { id: 502, name: "Ice Cream Sundae", price: 5.99 },
            { id: 503, name: "Cheesecake", price: 8.99 }
        ]
    },
    {
        id: 6,
        name: "Coffee Corner",
        cuisine: "Coffee, Cafe",
        rating: 4.2,
        deliveryTime: "15-25 min",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        menu: [
            { id: 601, name: "Cappuccino", price: 4.99 },
            { id: 602, name: "Latte", price: 5.49 },
            { id: 603, name: "Croissant", price: 3.99 }
        ]
    }
];

// Cart data
let cart = [];
let cartTotal = 0;

// DOM Elements
const restaurantList = document.getElementById('restaurantList');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');
const checkoutBtn = document.getElementById('checkoutBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderRestaurants();
    updateCart();
    
    // Event Listeners
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    overlay.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', checkout);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close cart with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCartSidebar();
        }
    });
});

// Render restaurants
function renderRestaurants() {
    restaurantList.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        
        let menuItemsHTML = '';
        restaurant.menu.forEach(item => {
            menuItemsHTML += `
                <div class="menu-item">
                    <div>
                        <div class="item-name">${item.name}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-restaurant="${restaurant.id}" data-item="${item.id}">Add</button>
                    </div>
                </div>
            `;
        });
        
        restaurantCard.innerHTML = `
            <div class="restaurant-img" style="background-image: url('${restaurant.image}')"></div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-meta">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}</span>
                    </div>
                    <div class="delivery-time">${restaurant.deliveryTime}</div>
                </div>
                <div class="menu-items">
                    ${menuItemsHTML}
                </div>
            </div>
        `;
        
        restaurantList.appendChild(restaurantCard);
    });
    
    // Add event listeners to "Add to cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const restaurantId = parseInt(this.getAttribute('data-restaurant'));
            const itemId = parseInt(this.getAttribute('data-item'));
            addToCart(restaurantId, itemId);
        });
    });
}

// Add item to cart
function addToCart(restaurantId, itemId) {
    // Find the restaurant
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    // Find the menu item
    const menuItem = restaurant.menu.find(item => item.id === itemId);
    if (!menuItem) return;
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            restaurant: restaurant.name
        });
    }
    
    updateCart();
    showNotification(`${menuItem.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    
    updateCart();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add items from restaurants to get started</p>
            </div>
        `;
    } else {
        let cartItemsHTML = '';
        cartTotal = 0;
        
        cart.forEach(item => {
            cartTotal += item.price * item.quantity;
            
            cartItemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} each</p>
                        <small>From: ${item.restaurant}</small>
                    </div>
                    <div class="cart-item-controls">
                        <button class="remove-item" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="add-item" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartItemsHTML;
        
        // Add event listeners to cart item controls
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
        
        document.querySelectorAll('.add-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const cartItem = cart.find(item => item.id === itemId);
                if (cartItem) {
                    // Find which restaurant this item belongs to
                    for (const restaurant of restaurants) {
                        const menuItem = restaurant.menu.find(item => item.id === itemId);
                        if (menuItem) {
                            addToCart(restaurant.id, itemId);
                            break;
                        }
                    }
                }
            });
        });
    }
    
    // Update total price
    totalPrice.textContent = `$${cartTotal.toFixed(2)}`;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff2e63;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Add CSS for animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orderSummary = cart.map(item => 
        `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    alert(`Order placed successfully!\n\nOrder Summary:\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nThank you for your order!`);
    
    // Clear cart
    cart = [];
    updateCart();
    closeCartSidebar();
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        navLinks.style.gap = '15px';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});
/* =========================================
   VOLTA - CART SYSTEM
========================================= */

let cart = JSON.parse(localStorage.getItem("voltaCart")) || [];

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartClose = document.getElementById("cartClose");

const cartItems = document.getElementById("cartItems");
const cartTotalItems = document.getElementById("cartTotalItems");


/* =========================================
   SAVE CART
========================================= */

function saveCart() {
    localStorage.setItem("voltaCart", JSON.stringify(cart));
}


/* =========================================
   CART TOTAL
========================================= */

function getCartTotalItems() {
    return cart.reduce((total, item) => {
        return total + Number(item.quantity);
    }, 0);
}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    if (!cartCount) return;

    const totalItems = getCartTotalItems();

    cartCount.textContent = totalItems;

    if (totalItems > 0) {
        cartCount.classList.add("show");
    } else {
        cartCount.classList.remove("show");
    }
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(product) {

    const existingProduct = cart.find(item =>
        item.id === product.id &&
        item.section === product.section
    );

    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) +
            Number(product.quantity);

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            unit: product.unit,
            quantity: Number(product.quantity),
            section: product.section || "غير محدد"
        });

    }

    saveCart();
    updateCartCount();
    renderCart();
}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id, section) {

    cart = cart.filter(item =>
        !(item.id === id && item.section === section)
    );

    saveCart();
    updateCartCount();
    renderCart();
}


/* =========================================
   CHANGE CART QUANTITY
========================================= */

function changeCartQuantity(id, section, change) {

    const item = cart.find(product =>
        product.id === id &&
        product.section === section
    );

    if (!item) return;

    item.quantity = Number(item.quantity) + change;

    if (item.quantity <= 0) {

        removeFromCart(id, section);
        return;

    }

    saveCart();
    updateCartCount();
    renderCart();
}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>

                <h3>السلة فارغة</h3>

                <p>
                    أضف المنتجات المطلوبة إلى السلة
                </p>
            </div>
        `;

        if (cartTotalItems) {
            cartTotalItems.textContent = "0";
        }

        return;
    }


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.onerror=null; this.src='assets/products/placeholder.webp';"
                >

            </div>


            <div class="cart-item-content">

                <div class="cart-item-header">

                    <h4>
                        ${item.name}
                    </h4>

                    <button
                        type="button"
                        class="cart-remove"
                        data-id="${item.id}"
                        data-section="${item.section}"
                        aria-label="حذف المنتج"
                    >
                        ×
                    </button>

                </div>


                <span class="cart-item-section">
                    ${item.section}
                </span>


                <div class="cart-item-bottom">

                    <div class="cart-item-quantity">

                        <button
                            type="button"
                            class="cart-quantity-btn cart-minus"
                            data-id="${item.id}"
                            data-section="${item.section}"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="cart-quantity-btn cart-plus"
                            data-id="${item.id}"
                            data-section="${item.section}"
                        >
                            +
                        </button>

                    </div>


                    <span class="cart-item-unit">
                        ${item.unit}
                    </span>

                </div>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });


    if (cartTotalItems) {

        cartTotalItems.textContent =
            getCartTotalItems();

    }
}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    if (!cartOverlay || !cartDrawer) return;

    cartOverlay.classList.add("active");
    cartDrawer.classList.add("active");

    document.body.classList.add("cart-open");
}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    if (!cartOverlay || !cartDrawer) return;

    cartOverlay.classList.remove("active");
    cartDrawer.classList.remove("active");

    document.body.classList.remove("cart-open");
}


/* =========================================
   CART BUTTON
========================================= */

if (cartButton) {

    cartButton.addEventListener("click", openCart);

}


/* =========================================
   CLOSE BUTTON
========================================= */

if (cartClose) {

    cartClose.addEventListener("click", closeCart);

}


/* =========================================
   OVERLAY CLICK
========================================= */

if (cartOverlay) {

    cartOverlay.addEventListener("click", function(event) {

        if (event.target === cartOverlay) {
            closeCart();
        }

    });

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeCart();
    }

});


/* =========================================
   CART BUTTONS
========================================= */

document.addEventListener("click", function(event) {

    const plusButton =
        event.target.closest(".cart-plus");

    if (plusButton) {

        const id =
            Number(plusButton.dataset.id);

        const section =
            plusButton.dataset.section;

        changeCartQuantity(
            id,
            section,
            1
        );

        return;
    }


    const minusButton =
        event.target.closest(".cart-minus");

    if (minusButton) {

        const id =
            Number(minusButton.dataset.id);

        const section =
            minusButton.dataset.section;

        changeCartQuantity(
            id,
            section, -1
        );

        return;
    }


    const removeButton =
        event.target.closest(".cart-remove");

    if (removeButton) {

        const id =
            Number(removeButton.dataset.id);

        const section =
            removeButton.dataset.section;

        removeFromCart(
            id,
            section
        );

    }

});


/* =========================================
   INITIALIZE
========================================= */

updateCartCount();
renderCart();
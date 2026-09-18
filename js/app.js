/* =========================================
   VOLTA - CAFE APP
========================================= */


/* =========================================
   Elements
========================================= */

const productsGrid = document.getElementById("productsGrid");
const emptyProducts = document.getElementById("emptyProducts");
const productSearch = document.getElementById("productSearch");
const currentSection = document.getElementById("currentSection");

const subSectionCards = document.querySelectorAll(".sub-section-card");


/* =========================================
   Current Section
========================================= */

let selectedSection = "مخزن الكافيه";


/* =========================================
   Render Products
========================================= */

function renderProducts(products) {

    if (!productsGrid) return;

    productsGrid.innerHTML = "";


    /* No Products */

    if (!products || products.length === 0) {

        if (emptyProducts) {
            emptyProducts.hidden = false;
        }

        return;
    }


    /* Hide Empty Message */

    if (emptyProducts) {
        emptyProducts.hidden = true;
    }


    /* Create Products */

    products.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <!-- Product Image -->

            <div class="product-image-wrapper">

                <span class="product-number">
                    #${String(product.id).padStart(2, "0")}
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/products/placeholder.webp';"
                >

            </div>


            <!-- Product Information -->

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <span class="product-unit">
                    ${product.unit}
                </span>

            </div>


            <!-- Product Actions -->

            <div class="product-actions">

                <div class="quantity-row">

                    <div class="quantity-box">

                        <button
                            type="button"
                            class="quantity-btn quantity-minus"
                            data-id="${product.id}"
                            aria-label="تقليل الكمية"
                        >
                            −
                        </button>


                        <input
                            type="number"
                            min="0"
                            step="1"
                            value="0"
                            class="product-quantity"
                            data-id="${product.id}"
                            aria-label="كمية ${product.name}"
                        >


                        <button
                            type="button"
                            class="quantity-btn quantity-plus"
                            data-id="${product.id}"
                            aria-label="زيادة الكمية"
                        >
                            +
                        </button>

                    </div>


                    <span class="quantity-unit">
                        ${product.unit}
                    </span>

                </div>


                <button
                    type="button"
                    class="add-to-cart"
                    data-id="${product.id}"
                >
                    <span>🛒</span>
                    <span>إضافة للسلة</span>
                </button>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================
   Initial Render
========================================= */

renderProducts(cafeProducts);


/* =========================================
   Section Buttons
========================================= */

subSectionCards.forEach(button => {

    button.addEventListener("click", function() {


        /* Remove Active */

        subSectionCards.forEach(item => {
            item.classList.remove("active");
        });


        /* Add Active */

        this.classList.add("active");


        /* Get Section */

        selectedSection = this.dataset.section;


        /* Update Current Section */

        if (currentSection) {
            currentSection.textContent = selectedSection;
        }


        /* Clear Search */

        if (productSearch) {
            productSearch.value = "";
        }


        /* Show Products */

        renderProducts(cafeProducts);

    });

});


/* =========================================
   Search Products
========================================= */

if (productSearch) {

    productSearch.addEventListener("input", function() {

        const searchValue = this.value
            .trim()
            .toLowerCase();


        const filteredProducts = cafeProducts.filter(product => {

            return product.name
                .toLowerCase()
                .includes(searchValue);

        });


        renderProducts(filteredProducts);

    });

}


/* =========================================
   Quantity Plus / Minus
========================================= */

document.addEventListener("click", function(event) {


    /* =====================================
       PLUS
    ===================================== */

    const plusButton = event.target.closest(".quantity-plus");

    if (plusButton) {

        const card = plusButton.closest(".product-card");

        if (!card) return;


        const input = card.querySelector(".product-quantity");

        if (!input) return;


        let value = Number(input.value) || 0;

        value++;

        input.value = value;

        return;
    }


    /* =====================================
       MINUS
    ===================================== */

    const minusButton = event.target.closest(".quantity-minus");

    if (minusButton) {

        const card = minusButton.closest(".product-card");

        if (!card) return;


        const input = card.querySelector(".product-quantity");

        if (!input) return;


        let value = Number(input.value) || 0;


        if (value > 0) {
            value--;
        }


        input.value = value;

    }

});


/* =========================================
   Add To Cart
========================================= */

document.addEventListener("click", function(event) {

    const button = event.target.closest(".add-to-cart");

    if (!button) return;


    /* Product ID */

    const productId = Number(button.dataset.id);


    /* Find Product */

    const product = cafeProducts.find(
        item => item.id === productId
    );


    if (!product) {
        console.error("Product not found:", productId);
        return;
    }


    /* Product Card */

    const card = button.closest(".product-card");

    if (!card) return;


    /* Quantity */

    const quantityInput =
        card.querySelector(".product-quantity");


    if (!quantityInput) return;


    const quantity = Number(quantityInput.value);


    /* Validate Quantity */

    if (!quantity || quantity <= 0) {

        showToast("من فضلك اكتب الكمية أولاً");

        quantityInput.focus();

        return;
    }


    /* =====================================
       Add Product To Cart
    ===================================== */

    if (typeof addToCart === "function") {

        addToCart({

            ...product,

            quantity: quantity,

            section: selectedSection

        });


        /* Success */

        showToast("✓ تمت إضافة المنتج للسلة");


        /* Reset Quantity */

        quantityInput.value = "0";

    } else {

        console.error(
            "addToCart() غير موجودة. تأكد من cart.js"
        );

        showToast("حدث خطأ في السلة");

    }

});


/* =========================================
   Toast
========================================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(window.voltaToastTimer);


    window.voltaToastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}


/* =========================================
   Get Current Cafe Section
========================================= */

window.getSelectedCafeSection = function() {

    return selectedSection;

};


/* =========================================
   Current Section Variable
========================================= */

window.selectedCafeSection = selectedSection;
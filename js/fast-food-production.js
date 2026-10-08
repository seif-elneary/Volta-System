/* =========================================
   VOLTA - FAST FOOD PRODUCTION
========================================= */

const WHATSAPP_NUMBER = "201280061001";


/* =========================================
   DEFAULT PRODUCTS
========================================= */

const productionProducts = [

    "بيتزا",

    "مكسيكي",

    "استربس حار",

    "استربس عادي",

    "فيليه حار",

    "فيليه عادي",

    "قطع فريد حار",

    "قطع فريد عادي",

    "برجر بينق برجر",

    "هاي بينق برجر",

    "تومية",

    "كلوسلوه",

    "صلصة بيتزا",

    "استربس خام",

    "فليه خام ",

    "شريمب حار",

    "شريمب عادي",

    "قطع فريد خام"

];

/* =========================================
   ELEMENTS
========================================= */

const productsContainer =
    document.getElementById("productionProducts");

const addProductButton =
    document.getElementById("addProductionProduct");

const totalElement =
    document.getElementById("productionTotal");

const noteInput =
    document.getElementById("productionNote");

const sendButton =
    document.getElementById("sendProductionReport");


/* =========================================
   UPDATE TOTAL
========================================= */

function updateProductionTotal() {

    if (!productsContainer || !totalElement) {
        return;
    }

    const inputs =
        productsContainer.querySelectorAll(
            ".production-quantity"
        );

    let total = 0;

    inputs.forEach(input => {

        const quantity =
            Number(input.value) || 0;

        if (quantity > 0) {
            total += quantity;
        }

    });

    totalElement.textContent = total;
}


/* =========================================
   QUANTITY INPUT EVENTS
========================================= */

function attachQuantityEvents(element) {

    const input =
        element.querySelector(".production-quantity");

    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        updateProductionTotal
    );
}


/* =========================================
   ADD CUSTOM PRODUCT
========================================= */

function addCustomProduct() {

    if (!productsContainer) {
        return;
    }

    const currentProducts =
        productsContainer.querySelectorAll(
            ".production-product"
        );

    const number =
        currentProducts.length + 1;


    const product = document.createElement("div");

    product.className =
        "production-product custom-product";


    product.innerHTML = `

        <div class="product-number">
            ${String(number).padStart(2, "0")}
        </div>

        <div class="product-info">

            <input
                type="text"
                class="custom-product-input"
                placeholder="اسم المنتج"
                autocomplete="off"
            >

        </div>

        <div class="quantity-area">

            <span class="quantity-label">
                الكمية
            </span>

            <input
                type="number"
                class="production-quantity"
                min="0"
                value="0"
                inputmode="numeric"
            >

        </div>

        <button
            type="button"
            class="remove-product"
            aria-label="حذف المنتج"
        >
            ×
        </button>

    `;


    productsContainer.appendChild(product);


    /* =========================================
       QUANTITY EVENT
    ========================================== */

    attachQuantityEvents(product);


    /* =========================================
       REMOVE PRODUCT
    ========================================== */

    const removeButton =
        product.querySelector(".remove-product");


    if (removeButton) {

        removeButton.addEventListener(
            "click",
            function() {

                product.remove();

                updateProductNumbers();

                updateProductionTotal();

            }
        );

    }


    /* =========================================
       FOCUS PRODUCT NAME
    ========================================== */

    const nameInput =
        product.querySelector(
            ".custom-product-input"
        );


    if (nameInput) {
        nameInput.focus();
    }


    updateProductionTotal();
}


/* =========================================
   UPDATE PRODUCT NUMBERS
========================================= */

function updateProductNumbers() {

    if (!productsContainer) {
        return;
    }

    const products =
        productsContainer.querySelectorAll(
            ".production-product"
        );


    products.forEach((product, index) => {

        const number =
            product.querySelector(
                ".product-number"
            );

        if (number) {

            number.textContent =
                String(index + 1).padStart(2, "0");

        }

    });

}


/* =========================================
   ADD PRODUCT BUTTON
========================================= */

if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        addCustomProduct
    );

}


/* =========================================
   INITIALIZE EXISTING PRODUCTS
========================================= */

if (productsContainer) {

    const products =
        productsContainer.querySelectorAll(
            ".production-product"
        );


    products.forEach(product => {

        attachQuantityEvents(product);

    });

}


/* =========================================
   SEND PRODUCTION REPORT
========================================= */

function sendProductionReport() {

    if (!productsContainer) {
        return;
    }


    const products =
        productsContainer.querySelectorAll(
            ".production-product"
        );


    const reportProducts = [];


    /* =========================================
       COLLECT PRODUCTS
    ========================================== */

    products.forEach(product => {

        let name = "";


        /* =====================================
           CUSTOM PRODUCT
        ===================================== */

        const customName =
            product.querySelector(
                ".custom-product-input"
            );


        if (customName) {

            name =
                customName.value.trim();

        } else {

            const dataName =
                product.dataset.product || "";


            const nameElement =
                product.querySelector(
                    ".product-name"
                );


            if (dataName) {

                name = dataName;

            } else if (nameElement) {

                name =
                    nameElement.textContent.trim();

            }

        }


        /* =====================================
           QUANTITY
        ===================================== */

        const quantityInput =
            product.querySelector(
                ".production-quantity"
            );


        const quantity =
            quantityInput ?
            Number(quantityInput.value) || 0 :
            0;


        /* =====================================
           SAVE PRODUCT
        ===================================== */

        if (name) {

            reportProducts.push({
                name: name,
                quantity: quantity
            });

        }

    });


    /* =========================================
       CHECK PRODUCTS
    ========================================== */

    if (reportProducts.length === 0) {

        alert(
            "لم يتم إضافة أي منتجات في التقرير."
        );

        return;
    }


    /* =========================================
       DATE & TIME
    ========================================== */

    const now = new Date();


    const date =
        now.toLocaleDateString(
            "ar-EG", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        );


    const time =
        now.toLocaleTimeString(
            "ar-EG", {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    /* =========================================
       TOTAL
    ========================================== */

    const totalQuantity =
        reportProducts.reduce(
            (total, product) => {

                return total +
                    Number(product.quantity || 0);

            },
            0
        );


    /* =========================================
       PRODUCTS COUNT
    ========================================== */

    const producedProductsCount =
        reportProducts.filter(
            product =>
            Number(product.quantity) > 0
        ).length;


    /* =========================================
       BUILD PRODUCTS MESSAGE
    ========================================== */

    const productsText =
        reportProducts
        .map(product => {

            return (
                `• ${product.name} — *${product.quantity}*`
            );

        })
        .join("\n");


    /* =========================================
       NOTE
    ========================================== */

    const note =
        noteInput ?
        noteInput.value.trim() :
        "";


    /* =========================================
       FINAL MESSAGE
    ========================================== */

    let message = `

🟧 *VOLTA | تقرير التصنيع*

🏭 *تصنيع Fast Food*
━━━━━━━━━━━━━━━━━━━━

📅 التاريخ: ${date}
⏰ الوقت: ${time}

📦 *الكميات المصنعة*

${productsText}

━━━━━━━━━━━━━━━━━━━━
📦 عدد الأصناف: *${producedProductsCount}*
📊 إجمالي الكميات: *${totalQuantity}*
`;


    /* =========================================
       ADD NOTE
    ========================================== */

    if (note) {

        message += `

📝 ملاحظات:
${note}
`;

    } else {

        message += `

📝 ملاحظات: لا توجد
`;

    }


    /* =========================================
       FOOTER
    ========================================== */

    message += `

━━━━━━━━━━━━━━━━━━━━
✅ *تم تسجيل تقرير التصنيع*
🏭 *VOLTA System*
`;


    /* =========================================
       WHATSAPP URL
    ========================================== */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            message
        )}`;


    /* =========================================
       OPEN WHATSAPP
    ========================================== */

    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   SEND BUTTON
========================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendProductionReport
    );

}


/* =========================================
   INITIAL TOTAL
========================================= */

updateProductionTotal();
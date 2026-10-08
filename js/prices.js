/* =========================================
   VOLTA - PRICES
   Price Update + WhatsApp
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       ELEMENTS
    ========================================= */

    const pricesForm = document.getElementById("pricesForm");

    const priceProducts =
        document.getElementById("priceProducts");

    const addPriceProduct =
        document.getElementById("addPriceProduct");

    const priceProductsCount =
        document.getElementById("priceProductsCount");

    const priceProductsTotal =
        document.getElementById("priceProductsTotal");

    const pricePreviewList =
        document.getElementById("pricePreviewList");

    const previewSection =
        document.getElementById("previewSection");


    /* =========================================
       CREATE PRODUCT ROW
    ========================================= */

    function createProductRow() {

        const row = document.createElement("div");

        row.className = "price-product-row";

        row.innerHTML = `
            <div class="price-input-group product-name-group">

                <label>اسم المنتج</label>

                <input
                    type="text"
                    class="price-product-name"
                    placeholder="اسم المنتج"
                    autocomplete="off"
                >

            </div>


            <div class="price-input-group product-price-group">

                <label>السعر</label>

                <div class="price-input-wrapper">

                    <input
                        type="number"
                        class="price-product-price"
                        placeholder="0"
                        min="0"
                        step="0.01"
                    >

                    <span>جنيه</span>

                </div>

            </div>


            <button
                type="button"
                class="remove-price-product"
                aria-label="حذف المنتج"
            >
                ×
            </button>
        `;

        return row;
    }


    /* =========================================
       ADD PRODUCT
    ========================================= */

    if (addPriceProduct) {

        addPriceProduct.addEventListener("click", function() {

            const newRow = createProductRow();

            priceProducts.appendChild(newRow);

            updatePrices();

            const input =
                newRow.querySelector(".price-product-name");

            if (input) {
                input.focus();
            }

        });

    }


    /* =========================================
       GET PRODUCTS
    ========================================= */

    function getProducts() {

        if (!priceProducts) {
            return [];
        }

        const rows =
            priceProducts.querySelectorAll(
                ".price-product-row"
            );

        const products = [];

        rows.forEach(function(row) {

            const nameInput =
                row.querySelector(
                    ".price-product-name"
                );

            const priceInput =
                row.querySelector(
                    ".price-product-price"
                );


            const name =
                nameInput ?
                nameInput.value.trim() :
                "";


            const price =
                priceInput ?
                Number(priceInput.value) :
                0;


            if (name && price > 0) {

                products.push({
                    name: name,
                    price: price
                });

            }

        });

        return products;
    }


    /* =========================================
       FORMAT NUMBER
    ========================================= */

    function formatNumber(number) {

        return Number(number).toLocaleString(
            "ar-EG", {
                maximumFractionDigits: 2
            }
        );

    }


    /* =========================================
       UPDATE PRICES
    ========================================= */

    function updatePrices() {

        if (!priceProducts) {
            return;
        }

        const products = getProducts();

        let total = 0;


        products.forEach(function(product) {

            total += product.price;

        });


        if (priceProductsCount) {

            priceProductsCount.textContent =
                products.length;

        }


        if (priceProductsTotal) {

            priceProductsTotal.textContent =
                formatNumber(total);

        }


        renderPreview(products, total);

    }


    /* =========================================
       PREVIEW
    ========================================= */

    function renderPreview(products, total) {

        if (!pricePreviewList) {
            return;
        }


        if (products.length === 0) {

            pricePreviewList.innerHTML = `
                <div class="price-preview-empty">
                    أضف المنتجات والأسعار لتظهر هنا
                </div>
            `;

            return;
        }


        pricePreviewList.innerHTML = "";


        products.forEach(function(product, index) {

            const item =
                document.createElement("div");

            item.className =
                "price-preview-item";


            const number =
                document.createElement("span");

            number.className =
                "preview-number";

            number.textContent =
                index + 1;


            const name =
                document.createElement("span");

            name.className =
                "preview-name";

            name.textContent =
                product.name;


            const price =
                document.createElement("strong");

            price.className =
                "preview-price";

            price.textContent =
                formatNumber(product.price) +
                " جنيه";


            item.appendChild(number);

            item.appendChild(name);

            item.appendChild(price);


            pricePreviewList.appendChild(item);

        });


        const totalElement =
            document.createElement("div");

        totalElement.className =
            "price-preview-total";


        totalElement.innerHTML = `
            <span>
                إجمالي الأسعار
            </span>

            <strong>
                ${formatNumber(total)} جنيه
            </strong>
        `;


        pricePreviewList.appendChild(totalElement);

    }


    /* =========================================
       REMOVE PRODUCT
    ========================================= */

    document.addEventListener(
        "click",
        function(event) {

            const removeButton =
                event.target.closest(
                    ".remove-price-product"
                );


            if (!removeButton) {
                return;
            }


            const row =
                removeButton.closest(
                    ".price-product-row"
                );


            if (!row) {
                return;
            }


            const rows =
                priceProducts.querySelectorAll(
                    ".price-product-row"
                );


            if (rows.length === 1) {

                const nameInput =
                    row.querySelector(
                        ".price-product-name"
                    );

                const priceInput =
                    row.querySelector(
                        ".price-product-price"
                    );


                if (nameInput) {
                    nameInput.value = "";
                }


                if (priceInput) {
                    priceInput.value = "";
                }

            } else {

                row.remove();

            }


            updatePrices();

        }
    );


    /* =========================================
       LIVE UPDATE
    ========================================= */

    document.addEventListener(
        "input",
        function(event) {

            if (
                event.target.classList.contains(
                    "price-product-name"
                ) ||
                event.target.classList.contains(
                    "price-product-price"
                )
            ) {

                updatePrices();

            }

        }
    );


    /* =========================================
       SECTION SELECT
    ========================================= */

    const sectionInputs =
        document.querySelectorAll(
            'input[name="priceSection"]'
        );


    sectionInputs.forEach(function(input) {

        input.addEventListener(
            "change",
            function() {

                if (previewSection) {

                    previewSection.textContent =
                        this.value;

                }

            }
        );

    });


    /* =========================================
       SEND PRICES TO WHATSAPP
    ========================================= */

    if (pricesForm) {

        pricesForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                /* ===============================
                   SELECT SECTION
                =============================== */

                const selectedSection =
                    document.querySelector(
                        'input[name="priceSection"]:checked'
                    );


                if (!selectedSection) {

                    alert(
                        "من فضلك اختر القسم أولاً"
                    );

                    return;

                }


                const section =
                    selectedSection.value;


                /* ===============================
                   GET PRODUCTS
                =============================== */

                const products =
                    getProducts();


                if (products.length === 0) {

                    alert(
                        "من فضلك أضف منتج واحد على الأقل مع السعر"
                    );

                    return;

                }


                /* ===============================
                   TOTAL
                =============================== */

                const total =
                    products.reduce(
                        function(sum, product) {

                            return sum + product.price;

                        },
                        0
                    );


                /* ===============================
                   DATE & TIME
                =============================== */

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


                /* ===============================
                   PRODUCTS TEXT
                =============================== */

                const productsText =
                    products
                    .map(function(product, index) {

                        return (
                            `${index + 1}️⃣ *${product.name}* — ` +
                            `${formatNumber(product.price)} جنيه`
                        );

                    })
                    .join("\n");


                /* ===============================
                   WHATSAPP MESSAGE
                =============================== */

                const message =

                    `💰 *ڤولتا | VOLTA*

📢 *تحديث أسعار المنتجات*
━━━━━━━━━━━━━━━━━━

📌 *القسم:* ${section}

📋 *المنتجات والأسعار:*

${productsText}

━━━━━━━━━━━━━━━━━━

📦 *عدد المنتجات:* ${products.length}

💵 *إجمالي الأسعار:* ${formatNumber(total)} جنيه

📅 *التاريخ:* ${date}

⏰ *الوقت:* ${time}

━━━━━━━━━━━━━━━━━━

✅ *تم إرسال الأسعار عبر نظام VOLTA*`;


                /* ===============================
                   WHATSAPP NUMBER
                =============================== */

                const phone =
                    "201280061001";


                /* ===============================
                   WHATSAPP URL
                =============================== */

                const whatsappURL =
                    "https://wa.me/" +
                    phone +
                    "?text=" +
                    encodeURIComponent(message);


                /* ===============================
                   OPEN WHATSAPP
                =============================== */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =========================================
       INITIAL UPDATE
    ========================================= */

    updatePrices();

});
/* =========================================
   VOLTA - RESTAURANT PRODUCTS
========================================= */
/* =========================================
   VOLTA - RESTAURANT APP
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    const productsGrid = document.getElementById("productsGrid");
    const emptyProducts = document.getElementById("emptyProducts");
    const productSearch = document.getElementById("productSearch");
    const currentSection = document.getElementById("currentSection");
    const subSectionCards =
        document.querySelectorAll(".sub-section-card");

    let selectedSection = "مخزن المطعم";

    /* =========================
       CHECK PRODUCTS
    ========================= */

    if (!productsGrid) {
        console.error("productsGrid not found");
        return;
    }

    if (
        typeof restaurantProducts === "undefined" ||
        !Array.isArray(restaurantProducts)
    ) {
        console.error(
            "restaurantProducts not found. Check restaurant products file."
        );
        return;
    }

    console.log(
        "Restaurant products loaded:",
        restaurantProducts.length
    );


    /* =========================
       RENDER PRODUCTS
    ========================= */

    function renderProducts(products = restaurantProducts) {

        productsGrid.innerHTML = "";

        if (!products.length) {

            if (emptyProducts) {
                emptyProducts.hidden = false;
            }

            return;
        }

        if (emptyProducts) {
            emptyProducts.hidden = true;
        }

        products.forEach(function(product) {

            const card = document.createElement("article");

            card.className = "product-card";

            card.innerHTML = `
                <div class="product-image-wrapper">

                    <span class="product-number">
                        #${product.id}
                    </span>

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="
                            this.onerror=null;
                            this.src='assets/products/placeholder.webp';
                        "
                    >

                </div>

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <span class="product-unit">
                        ${product.unit}
                    </span>

                </div>

                <div class="product-actions">

                    <div class="quantity-row">

                        <div class="quantity-box">

                            <button
                                type="button"
                                class="quantity-btn quantity-minus"
                                aria-label="تقليل الكمية">
                                −
                            </button>

                            <input
                                type="number"
                                class="product-quantity"
                                value="1"
                                min="1"
                                step="1"
                                inputmode="numeric"
                            >

                            <button
                                type="button"
                                class="quantity-btn quantity-plus"
                                aria-label="زيادة الكمية">
                                +
                            </button>

                        </div>

                        <span class="quantity-unit">
                            ${product.unit}
                        </span>

                    </div>

                    <button
                        type="button"
                        class="add-to-cart">

                        🛒
                        <span>إضافة للطلب</span>

                    </button>

                </div>
            `;

            productsGrid.appendChild(card);


            /* =========================
               QUANTITY
            ========================= */

            const quantityInput =
                card.querySelector(".product-quantity");

            const minusButton =
                card.querySelector(".quantity-minus");

            const plusButton =
                card.querySelector(".quantity-plus");

            const addButton =
                card.querySelector(".add-to-cart");


            plusButton.addEventListener(
                "click",
                function() {

                    let quantity =
                        Number(quantityInput.value) || 1;

                    quantity++;

                    quantityInput.value = quantity;
                }
            );


            minusButton.addEventListener(
                "click",
                function() {

                    let quantity =
                        Number(quantityInput.value) || 1;

                    if (quantity > 1) {
                        quantity--;
                    }

                    quantityInput.value = quantity;
                }
            );


            quantityInput.addEventListener(
                "input",
                function() {

                    let quantity =
                        Number(quantityInput.value);

                    if (!quantity || quantity < 1) {
                        quantityInput.value = 1;
                    }
                }
            );


            /* =========================
               ADD TO CART
            ========================= */

            addButton.addEventListener(
                "click",
                function() {

                    const quantity =
                        Number(quantityInput.value) || 1;

                    const cartProduct = {

                        id: product.id,

                        name: product.name,

                        image: product.image,

                        unit: product.unit,

                        quantity: quantity,

                        section: selectedSection
                    };


                    if (typeof addToCart === "function") {

                        addToCart(cartProduct);

                        showToast(
                            `تم إضافة ${product.name} إلى الطلب`
                        );

                    } else {

                        console.error(
                            "addToCart function not found"
                        );

                    }
                }
            );

        });
    }


    /* =========================
       SECTION SWITCHING
    ========================= */

    subSectionCards.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                subSectionCards.forEach(function(item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                selectedSection =
                    button.dataset.section ||
                    "مخزن المطعم";


                if (currentSection) {
                    currentSection.textContent =
                        selectedSection;
                }


                /* إعادة عرض المنتجات */

                const searchValue =
                    productSearch ?
                    productSearch.value.trim() :
                    "";

                if (searchValue) {

                    searchProducts(searchValue);

                } else {

                    renderProducts(restaurantProducts);

                }

            }
        );

    });


    /* =========================
       SEARCH
    ========================= */

    function searchProducts(value) {

        const searchTerm =
            value.trim().toLowerCase();

        if (!searchTerm) {

            renderProducts(restaurantProducts);

            return;
        }


        const filteredProducts =
            restaurantProducts.filter(function(product) {

                return product.name
                    .toLowerCase()
                    .includes(searchTerm);

            });


        renderProducts(filteredProducts);
    }


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            function() {

                searchProducts(
                    productSearch.value
                );

            }
        );

    }


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            window.restaurantToastTimer
        );


        window.restaurantToastTimer =
            setTimeout(function() {

                toast.classList.remove("show");

            }, 2500);
    }


    /* =========================
       GLOBAL SECTION
    ========================= */

    window.getSelectedRestaurantSection =
        function() {
            return selectedSection;
        };


    window.selectedRestaurantSection =
        selectedSection;


    /* =========================
       INITIAL RENDER
    ========================= */

    renderProducts(restaurantProducts);

});
const restaurantProducts = [
    { id: 1, name: "ارز", unit: "قطعة", image: "assets/products/restaurant/01.webp" },
    { id: 2, name: "عيش فطار", unit: "قطعة", image: "assets/products/restaurant/02.webp" },
    { id: 3, name: "استربس خام", unit: "قطعة", image: "assets/products/restaurant/03.webp" },
    { id: 4, name: "عيش سوبر 10", unit: "قطعة", image: "assets/products/restaurant/04.webp" },
    { id: 5, name: "استربس حار", unit: "قطعة", image: "assets/products/restaurant/05.webp" },
    { id: 6, name: "صدور بانية خاام", unit: "قطعة", image: "assets/products/restaurant/06.webp" },
    { id: 7, name: "استربس عادي", unit: "قطعة", image: "assets/products/restaurant/07.webp" },
    { id: 8, name: "فلفل اخضر", unit: "قطعة", image: "assets/products/restaurant/08.webp" },
    { id: 9, name: "اكياس فرش", unit: "قطعة", image: "assets/products/restaurant/09.webp" },
    { id: 10, name: "فلفل اسود", unit: "قطعة", image: "assets/products/restaurant/10.webp" },
    { id: 11, name: "اكياس رلبن", unit: "قطعة", image: "assets/products/restaurant/11.webp" },
    { id: 12, name: "فلفل حاار", unit: "قطعة", image: "assets/products/restaurant/12.webp" },
    { id: 13, name: "انبوبة", unit: "قطعة", image: "assets/products/restaurant/13.webp" },
    { id: 14, name: "فول", unit: "قطعة", image: "assets/products/restaurant/14.webp" },
    { id: 15, name: "برجر بيف صغير", unit: "قطعة", image: "assets/products/restaurant/15.webp" },
    { id: 16, name: "فيلية خاام", unit: "قطعة", image: "assets/products/restaurant/16.webp" },
    { id: 17, name: "برجر بيف كبير", unit: "قطعة", image: "assets/products/restaurant/17.webp" },
    { id: 18, name: "فيلية عادي", unit: "قطعة", image: "assets/products/restaurant/18.webp" },
    { id: 19, name: "برجر دجاج", unit: "قطعة", image: "assets/products/restaurant/19.webp" },
    { id: 20, name: "فيلية حار", unit: "قطعة", image: "assets/products/restaurant/20.webp" },
    { id: 21, name: "بسطرمة", unit: "قطعة", image: "assets/products/restaurant/21.webp" },
    { id: 22, name: "قشطة", unit: "قطعة", image: "assets/products/restaurant/22.webp" },
    { id: 23, name: "بصل", unit: "قطعة", image: "assets/products/restaurant/23.webp" },
    { id: 24, name: "قطع فرايد خاام", unit: "قطعة", image: "assets/products/restaurant/24.webp" },
    { id: 25, name: "بصل بودر", unit: "قطعة", image: "assets/products/restaurant/25.webp" },
    { id: 26, name: "قطع فرايد حار", unit: "قطعة", image: "assets/products/restaurant/26.webp" },
    { id: 27, name: "بطاطس", unit: "قطعة", image: "assets/products/restaurant/27.webp" },
    { id: 28, name: "قطع فرايد عادي", unit: "قطعة", image: "assets/products/restaurant/28.webp" },
    { id: 29, name: "بكر كاشير", unit: "قطعة", image: "assets/products/restaurant/29.webp" },
    { id: 30, name: "كابوتشي", unit: "قطعة", image: "assets/products/restaurant/30.webp" },
    { id: 31, name: "بكر ستريتش", unit: "قطعة", image: "assets/products/restaurant/31.webp" },
    { id: 32, name: "كاتشب ظرف", unit: "قطعة", image: "assets/products/restaurant/32.webp" },
    { id: 33, name: "بيج كولا150مللي", unit: "قطعة", image: "assets/products/restaurant/33.webp" },
    { id: 34, name: "كرباناتو", unit: "قطعة", image: "assets/products/restaurant/34.webp" },
    { id: 35, name: "بيج كولا لتر", unit: "قطعة", image: "assets/products/restaurant/35.webp" },
    { id: 36, name: "كرنب كول سلو", unit: "قطعة", image: "assets/products/restaurant/36.webp" },
    { id: 37, name: "بيض", unit: "قطعة", image: "assets/products/restaurant/37.webp" },
    { id: 38, name: "كول سلو", unit: "قطعة", image: "assets/products/restaurant/38.webp" },
    { id: 39, name: "بيف بيكون", unit: "قطعة", image: "assets/products/restaurant/39.webp" },
    { id: 40, name: "كمون", unit: "قطعة", image: "assets/products/restaurant/40.webp" },
    { id: 41, name: "هالبينو", unit: "قطعة", image: "assets/products/restaurant/41.webp" },
    { id: 42, name: "لانشون", unit: "قطعة", image: "assets/products/restaurant/42.webp" },
    { id: 43, name: "هوت صوص", unit: "قطعة", image: "assets/products/restaurant/43.webp" },
    { id: 44, name: "لبن مراعي", unit: "قطعة", image: "assets/products/restaurant/44.webp" },
    { id: 45, name: "تتبييلة برجر", unit: "قطعة", image: "assets/products/restaurant/45.webp" },
    { id: 46, name: "لحمة مفروم", unit: "قطعة", image: "assets/products/restaurant/46.webp" },
    { id: 47, name: "تتبلية حار", unit: "قطعة", image: "assets/products/restaurant/47.webp" },
    { id: 48, name: "لفة فويل", unit: "قطعة", image: "assets/products/restaurant/48.webp" },
    { id: 49, name: "تتبيلة عادي", unit: "قطعة", image: "assets/products/restaurant/49.webp" },
    { id: 50, name: "ليمون", unit: "قطعة", image: "assets/products/restaurant/50.webp" },
    { id: 51, name: "تركي مدخن", unit: "قطعة", image: "assets/products/restaurant/51.webp" },
    { id: 52, name: "ليمون معصفر", unit: "قطعة", image: "assets/products/restaurant/52.webp" },
    { id: 53, name: "توابل بطاطس", unit: "قطعة", image: "assets/products/restaurant/53.webp" },
    { id: 54, name: "صوص مايونيز حار", unit: "قطعة", image: "assets/products/restaurant/54.webp" },
    { id: 55, name: "توم", unit: "قطعة", image: "assets/products/restaurant/55.webp" },
    { id: 56, name: "مخلل مشكل", unit: "قطعة", image: "assets/products/restaurant/56.webp" },
    { id: 57, name: "ثوم بودر", unit: "قطعة", image: "assets/products/restaurant/57.webp" },
    { id: 58, name: "مربي", unit: "قطعة", image: "assets/products/restaurant/58.webp" },
    { id: 59, name: "تومية", unit: "قطعة", image: "assets/products/restaurant/59.webp" },
    { id: 60, name: "مرقة دجاج", unit: "قطعة", image: "assets/products/restaurant/60.webp" },
    { id: 61, name: "تيكاواي اطباق سيلفر", unit: "قطعة", image: "assets/products/restaurant/61.webp" },
    { id: 62, name: "مشروم", unit: "قطعة", image: "assets/products/restaurant/62.webp" },
    { id: 63, name: "تيكاواي اكياس فولتا", unit: "قطعة", image: "assets/products/restaurant/63.webp" },
    { id: 64, name: "معالق بلاستيك صغيرة", unit: "قطعة", image: "assets/products/restaurant/64.webp" },
    { id: 65, name: "تيكاواي باكت تويستر", unit: "قطعة", image: "assets/products/restaurant/65.webp" },
    { id: 66, name: "معالق بلاستيك كبيرة", unit: "قطعة", image: "assets/products/restaurant/66.webp" },
    { id: 67, name: "تيكاواي ستاندر بوكس", unit: "قطعة", image: "assets/products/restaurant/67.webp" },
    { id: 68, name: "شوك بلاستيك", unit: "قطعة", image: "assets/products/restaurant/68.webp" },
    { id: 69, name: "تيكاواي علب بيتزا", unit: "قطعة", image: "assets/products/restaurant/69.webp" },
    { id: 70, name: "فراح مكسيكي", unit: "قطعة", image: "assets/products/restaurant/70.webp" },
    { id: 71, name: "تيكاواي علبة فاميلي", unit: "قطعة", image: "assets/products/restaurant/71.webp" },
    { id: 72, name: "ملح خشن", unit: "قطعة", image: "assets/products/restaurant/72.webp" },
    { id: 73, name: "تيكاواي علب كول سلو صغير", unit: "قطعة", image: "assets/products/restaurant/73.webp" },
    { id: 74, name: "ملح سفرة", unit: "قطعة", image: "assets/products/restaurant/74.webp" },
    { id: 75, name: "تيكاواي علب كول سلو كبير", unit: "قطعة", image: "assets/products/restaurant/75.webp" },
    { id: 76, name: "ملح ليمون", unit: "قطعة", image: "assets/products/restaurant/76.webp" },
    { id: 77, name: "تيكاواي علبة فيلر10", unit: "قطعة", image: "assets/products/restaurant/77.webp" },
    { id: 78, name: "جبنة موتزريلا", unit: "قطعة", image: "assets/products/restaurant/78.webp" },
    { id: 79, name: "تيكاواي علبة فيلر 7", unit: "قطعة", image: "assets/products/restaurant/79.webp" },
    { id: 80, name: "موتزريلا ستيكس", unit: "قطعة", image: "assets/products/restaurant/80.webp" },
    { id: 81, name: "تيكاواي غطاء اطباق سيلفر", unit: "قطعة", image: "assets/products/restaurant/81.webp" },
    { id: 82, name: "ورق فرش مطبوع", unit: "قطعة", image: "assets/products/restaurant/82.webp" },
    { id: 83, name: "تيكاواي غطاء كول سلو صغير", unit: "قطعة", image: "assets/products/restaurant/83.webp" },
    { id: 84, name: "ورق حراري لف وحزم", unit: "قطعة", image: "assets/products/restaurant/84.webp" },
    { id: 85, name: "تيكاواي غطاء كول سلو كبير", unit: "قطعة", image: "assets/products/restaurant/85.webp" },
    { id: 86, name: "زيت زيتون", unit: "قطعة", image: "assets/products/restaurant/86.webp" },
    { id: 87, name: "جبنة رومي", unit: "قطعة", image: "assets/products/restaurant/87.webp" },
    { id: 88, name: "زيتون شرائح", unit: "قطعة", image: "assets/products/restaurant/88.webp" },
    { id: 89, name: "جبنة شيدر شرائح", unit: "قطعة", image: "assets/products/restaurant/89.webp" },
    { id: 90, name: "سكر", unit: "قطعة", image: "assets/products/restaurant/90.webp" },
    { id: 91, name: "جبنة عبور لاند", unit: "قطعة", image: "assets/products/restaurant/91.webp" },
    { id: 92, name: "سلامي", unit: "قطعة", image: "assets/products/restaurant/92.webp" },
    { id: 93, name: "جزر", unit: "قطعة", image: "assets/products/restaurant/93.webp" },
    { id: 94, name: "سمسم ابيض", unit: "قطعة", image: "assets/products/restaurant/94.webp" },
    { id: 95, name: "جلافز اسود", unit: "قطعة", image: "assets/products/restaurant/95.webp" },
    { id: 96, name: "سمنة جنة", unit: "قطعة", image: "assets/products/restaurant/96.webp" },
    { id: 97, name: "جلافز شفاف", unit: "قطعة", image: "assets/products/restaurant/97.webp" },
    { id: 98, name: "صوص شيدر", unit: "قطعة", image: "assets/products/restaurant/98.webp" },
    { id: 99, name: "جمبري", unit: "قطعة", image: "assets/products/restaurant/99.webp" },
    { id: 100, name: "صوص اورشيستر", unit: "قطعة", image: "assets/products/restaurant/100.webp" },
    { id: 101, name: "حبة البركة", unit: "قطعة", image: "assets/products/restaurant/101.webp" },
    { id: 102, name: "صوص باربكيو", unit: "قطعة", image: "assets/products/restaurant/102.webp" },
    { id: 103, name: "حلاوة طحينية", unit: "قطعة", image: "assets/products/restaurant/103.webp" },
    { id: 104, name: "صوص تايجر ريزو", unit: "قطعة", image: "assets/products/restaurant/104.webp" },
    { id: 105, name: "خل كلاسيك", unit: "قطعة", image: "assets/products/restaurant/105.webp" },
    { id: 106, name: "صوص تيكساس", unit: "قطعة", image: "assets/products/restaurant/106.webp" },
    { id: 107, name: "خل بلسمك", unit: "قطعة", image: "assets/products/restaurant/107.webp" },
    { id: 108, name: "صوص ديمي جلاس", unit: "قطعة", image: "assets/products/restaurant/108.webp" },
    { id: 109, name: "خلل شيش صغيرة", unit: "قطعة", image: "assets/products/restaurant/109.webp" },
    { id: 110, name: "صوص رانش", unit: "قطعة", image: "assets/products/restaurant/110.webp" },
    { id: 111, name: "خميرة", unit: "قطعة", image: "assets/products/restaurant/111.webp" },
    { id: 112, name: "صوص سويت شيلي", unit: "قطعة", image: "assets/products/restaurant/112.webp" },
    { id: 113, name: "خيار", unit: "قطعة", image: "assets/products/restaurant/113.webp" },
    { id: 114, name: "صوص كاتشب", unit: "قطعة", image: "assets/products/restaurant/114.webp" },
    { id: 115, name: "دقيق بريدينج", unit: "قطعة", image: "assets/products/restaurant/115.webp" },
    { id: 116, name: "صوص مايونيز", unit: "قطعة", image: "assets/products/restaurant/116.webp" },
    { id: 117, name: "دقيق بيتزا", unit: "قطعة", image: "assets/products/restaurant/117.webp" },
    { id: 118, name: "طحينة", unit: "قطعة", image: "assets/products/restaurant/118.webp" },
    { id: 119, name: "جبنة دمياط فارم", unit: "قطعة", image: "assets/products/restaurant/119.webp" },
    { id: 120, name: "طعمية", unit: "قطعة", image: "assets/products/restaurant/120.webp" },
    { id: 121, name: "ريد صوص", unit: "قطعة", image: "assets/products/restaurant/121.webp" },
    { id: 122, name: "طماطم", unit: "قطعة", image: "assets/products/restaurant/122.webp" },
    { id: 123, name: "زبادي", unit: "قطعة", image: "assets/products/restaurant/123.webp" },
    { id: 124, name: "عجينةبيتزا", unit: "قطعة", image: "assets/products/restaurant/124.webp" },
    { id: 125, name: "زبدة", unit: "قطعة", image: "assets/products/restaurant/125.webp" },
    { id: 126, name: "عسل اسود", unit: "قطعة", image: "assets/products/restaurant/126.webp" },
    { id: 127, name: "زعتر", unit: "قطعة", image: "assets/products/restaurant/127.webp" },
    { id: 128, name: "خلل شيش كبيرة", unit: "قطعة", image: "assets/products/restaurant/128.webp" },
    { id: 129, name: "زيت نباتي", unit: "قطعة", image: "assets/products/restaurant/129.webp" },
    { id: 130, name: "علب بطاطس تيكاواي", unit: "قطعة", image: "assets/products/restaurant/130.webp" },
    { id: 131, name: "زيت اولين", unit: "قطعة", image: "assets/products/restaurant/131.webp" },
    { id: 132, name: "ريمال صغير تيكاواي", unit: "قطعة", image: "assets/products/restaurant/132.webp" },
    { id: 133, name: "زيت شورتينج", unit: "قطعة", image: "assets/products/restaurant/133.webp" },
    { id: 134, name: "ريمال كبير تيكاواي", unit: "قطعة", image: "assets/products/restaurant/134.webp" },
    { id: 135, name: "زيتون كامل", unit: "قطعة", image: "assets/products/restaurant/135.webp" },
    { id: 136, name: "عيش تورتيلا", unit: "قطعة", image: "assets/products/restaurant/136.webp" },
    { id: 137, name: "عيش سوبر7", unit: "قطعة", image: "assets/products/restaurant/137.webp" },
    { id: 138, name: "عيش سوري", unit: "قطعة", image: "assets/products/restaurant/138.webp" },
    { id: 139, name: "كايزر 5 بوصة سيمولينا", unit: "قطعة", image: "assets/products/restaurant/139.webp" },
    { id: 140, name: "كايزر وجبات", unit: "قطعة", image: "assets/products/restaurant/140.webp" },
    { id: 141, name: "كايزر 4.5 بوصة بريوش", unit: "قطعة", image: "assets/products/restaurant/141.webp" },
    { id: 142, name: "كايزر 5 بوصة بريوش", unit: "قطعة", image: "assets/products/restaurant/142.webp" },
    { id: 143, name: "تيكاواي علبة قوقعة", unit: "قطعة", image: "assets/products/restaurant/143.webp" },
    { id: 144, name: "تيكاواي دبل راب", unit: "قطعة", image: "assets/products/restaurant/144.webp" },
    { id: 145, name: "تيكاواي علب ريزو", unit: "قطعة", image: "assets/products/restaurant/145.webp" },
    { id: 146, name: "تيكاواي غطاء علب ريزو", unit: "قطعة", image: "assets/products/restaurant/146.webp" },
    { id: 147, name: "تيكاواير كوفير", unit: "قطعة", image: "assets/products/restaurant/147.webp" }, {
        id: 148,
        name: "صابون أطباق",
        unit: "كيلو",
        image: "assets/products/restaurant/148.webp"
    },

    {
        id: 149,
        name: "أكياس رابش",
        unit: "قطعة",
        image: "assets/products/restaurant/149.webp"
    },

    {
        id: 150,
        name: "جلانس",
        unit: "عبوة",
        image: "assets/products/restaurant/150.webp"
    },

    {
        id: 151,
        name: "كلوريد",
        unit: "كيلو",
        image: "assets/products/restaurant/151.webp"
    },

    {
        id: 152,
        name: "كلور",
        unit: "لتر",
        image: "assets/products/restaurant/152.webp"
    }
];
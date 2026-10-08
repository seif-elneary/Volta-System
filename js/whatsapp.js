/* =========================================
   VOLTA - WHATSAPP ORDERS
========================================= */

const WHATSAPP_NUMBER = "201280061001";

/* =========================================
   SEND ORDER TO WHATSAPP
========================================= */

function sendOrderToWhatsApp() {

    const cart =
        JSON.parse(localStorage.getItem("voltaCart")) || [];

    const noteInput =
        document.getElementById("orderNote");

    const note =
        noteInput ? noteInput.value.trim() : "";


    /* =========================================
       CHECK CART + NOTE
    ========================================= */

    if (cart.length === 0 && !note) {

        if (typeof showToast === "function") {
            showToast("السلة فارغة ولم تتم إضافة أي ملاحظة");
        }

        return;
    }


    /* =========================================
       DATE & TIME
    ========================================= */

    const now = new Date();

    const date = now.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const time = now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit"
    });


    /* =========================================
       SECTION
    ========================================= */

    let section = "غير محدد";


    if (cart.length > 0) {

        const sections = [
            ...new Set(
                cart
                .map(item => item.section)
                .filter(Boolean)
            )
        ];


        if (sections.length === 1) {

            section = sections[0];

        } else if (sections.length > 1) {

            section = sections.join(" - ");

        }

    }


    /* =========================================
       TOTAL QUANTITY
    ========================================= */

    const totalQuantity = cart.reduce(
        (total, item) => {

            return total + Number(item.quantity || 0);

        },
        0
    );


    /* =========================================
       BUILD PRODUCTS
    ========================================= */

    let productsText = "";


    if (cart.length > 0) {

        productsText = cart.map((item, index) => {

            return (
                `${index + 1}️⃣ *${item.name}*\n` +
                `   الكمية: ${item.quantity} ${item.unit}`
            );

        }).join("\n\n");

    } else {

        productsText =
            "لا توجد منتجات مضافة للسلة.";

    }


    /* =========================================
       FINAL MESSAGE
    ========================================= */

    let message = `

🟦 *ڤولتا | VOLTA*

🛒 *طلب توريد جديد*
━━━━━━━━━━━━━━━━━━

📍 *القسم:* ${section}

📅 *التاريخ:* ${date}
⏰ *الوقت:* ${time}

📦 *المنتجات المطلوبة:*

${productsText}

━━━━━━━━━━━━━━━━━━
📊 *إجمالي الكميات:* ${totalQuantity}
`;


    /* =========================================
       NOTE
    ========================================= */

    if (note) {

        message += `

📝 *ملاحظات إضافية:*
${note}
`;

    }


    message += `

━━━━━━━━━━━━━━━━━━
✅ *تم إرسال الطلب عبر نظام Volta*
`;


    /* =========================================
       WHATSAPP URL
    ========================================= */

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =========================================
   SEND BUTTON
========================================= */

const sendOrderButton =
    document.getElementById("sendOrder");


if (sendOrderButton) {

    sendOrderButton.addEventListener(
        "click",
        sendOrderToWhatsApp
    );

}
document.addEventListener("DOMContentLoaded", function() {

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("voltaTheme") || "light";

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", function() {

            const isDark =
                document.body.classList.contains("dark-mode");

            const newTheme =
                isDark ? "light" : "dark";

            localStorage.setItem(
                "voltaTheme",
                newTheme
            );

            applyTheme(newTheme);

        });

    }

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

            if (themeToggle) {
                themeToggle.textContent = "☀️";
                themeToggle.setAttribute(
                    "aria-label",
                    "تفعيل الوضع الفاتح"
                );
            }

        } else {

            document.body.classList.remove("dark-mode");

            if (themeToggle) {
                themeToggle.textContent = "🌙";
                themeToggle.setAttribute(
                    "aria-label",
                    "تفعيل الوضع الداكن"
                );
            }

        }

    }

});
/* =========================================
   VOLTA - LOGIN SYSTEM
========================================= */



const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const loginError =
    document.getElementById("loginError");

const loginButton =
    document.getElementById("loginButton");


/* =========================================
   IF ALREADY LOGGED IN
========================================= */

if (
    sessionStorage.getItem("voltaLoggedIn") === "true"
) {
    window.location.replace("index.html");
}


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

if (passwordToggle) {

    passwordToggle.addEventListener(
        "click",
        function() {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

                passwordToggle.textContent = "🙈";

            } else {

                passwordInput.type = "password";

                passwordToggle.textContent = "👁";

            }

        }
    );

}


/* =========================================
   HIDE ERROR
========================================= */

function hideError() {

    if (loginError) {
        loginError.classList.remove("show");
    }

}

if (usernameInput) {
    usernameInput.addEventListener(
        "input",
        hideError
    );
}

if (passwordInput) {
    passwordInput.addEventListener(
        "input",
        hideError
    );
}


/* =========================================
   LOGIN
========================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            /* CHECK */

            if (
                username === LOGIN_USERNAME &&
                password === LOGIN_PASSWORD
            ) {

                /* SAVE LOGIN */

                sessionStorage.setItem(
                    "voltaLoggedIn",
                    "true"
                );


                /* BUTTON */

                if (loginButton) {

                    loginButton.disabled = true;

                    loginButton.innerHTML = `
                        <span>جاري الدخول...</span>
                        <span>✓</span>
                    `;

                }


                /* GO HOME */

                setTimeout(
                    function() {

                        window.location.replace(
                            "index.html"
                        );

                    },
                    400
                );

            } else {

                /* ERROR */

                if (loginError) {
                    loginError.classList.add("show");
                }

                passwordInput.value = "";

                passwordInput.focus();

            }

        }
    );

}
 /* =========================================
     VOLTA - SECTION AUTH
 ========================================= */

 (function() {

     const page = window.location.pathname
         .split("/")
         .pop()
         .toLowerCase();


     /* =========================================
        CAFE
     ========================================== */

     if (page === "cafe.html") {

         const access =
             sessionStorage.getItem("voltaCafeAccess");

         if (access !== "true") {
             window.location.replace("cafe-login.html");
             return;
         }
     }


     /* =========================================
        RESTAURANT
     ========================================== */

     if (page === "restaurant.html") {

         const access =
             sessionStorage.getItem("voltaRestaurantAccess");

         if (access !== "true") {
             window.location.replace("restaurant-login.html");
             return;
         }
     }


     /* =========================================
        FACTORY
     ========================================== */

     if (page === "factory.html") {

         const access =
             sessionStorage.getItem("voltaFactoryAccess");

         if (access !== "true") {
             window.location.replace("factory-login.html");
             return;
         }
     }

 })();
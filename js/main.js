import {
  getHomepageDate,
  getMealDetails,
  getCategories,
  getMealsByCategory,
  getAreas,
  filterAreaByCity,
  getIngredients,
  getMealsByIngrediants,
  searchMealByName,
  searchMealByFirstLetter,
} from "./api.js";

// Loader
$(window).on("load", function () {
  $(".loaderContainer").fadeOut(1000);
  $("body").css("overflow", "visible");
  $(".loaderContainer-inner").hide(0);
});

// sidebar menu
let navBarBtn = $(".nav-btn").children("a");

let sideBarInner = $(".innerbar").innerWidth();
$(".sidebar").animate({ left: -sideBarInner }, 0);

$(navBarBtn).on("click", function () {
  let sideBarLeftValue = $(".sidebar").css("left");

  //   Menu Close Animation
  if (sideBarLeftValue == "0px") {
    $(".sidebar").animate({ left: -sideBarInner }, 500);
    navBarBtn.children("i").removeClass("fa-x");
    navBarBtn.children("i").addClass("fa-bars");

    // menu items animation in close
    $("div.innerbar .navbar ul").children("li").animate({ top: 100 }, 200);
  } else {
    //   Menu open Animation
    $(".sidebar").animate({ left: 0 }, 500);
    navBarBtn.children("i").removeClass("fa-bars");
    navBarBtn.children("i").addClass("fa-x");

    // menu items animation in open
    for (let i = 0; i < 5; i++) {
      $("div.innerbar .navbar ul")
        .children("li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
  }
});

// Get Homepage Data
$("#main-data").html(await getHomepageDate());

// Get Meal Details Page
$(".meal-card a").on("click", async function (e) {
  $(".loaderContainer-inner").fadeIn(300);
  $(".sidebar").animate({ left: -sideBarInner }, 500);
  navBarBtn.children("i").removeClass("fa-x");
  navBarBtn.children("i").addClass("fa-bars");
  let mealid = $(e.target).attr("data-id");

  $("#main-data").html(await getMealDetails(mealid));
  $(".loaderContainer-inner").fadeOut(300);
});

//Get Search Page
$("#search").on("click", function () {
  $(".loaderContainer-inner").fadeIn(500, function () {
    $(".sidebar").animate({ left: -sideBarInner }, 500);
    navBarBtn.children("i").removeClass("fa-x");
    navBarBtn.children("i").addClass("fa-bars");

    $("#main-data").html(`<div class="row g-3">
  <div class="col">
    <input type="text" class="form-control bg-black text-white" id="searchByName" placeholder="Search By Name" aria-label="Search By Name">
  </div>
  <div class="col">
    <input type="text" class="form-control bg-black text-white" id="searchByFirstLetter" maxlength="1" placeholder="Search By First Letter" aria-label="Search By First Letter">
  </div>
  </div>`);

    $("#searchByName").on("input", async function (e) {
      $("#searchByFirstLetter").val("");
      $("#searchResults").html(await searchMealByName($(e.target).val()));
      $("#searchResults").show(0);

      // Get Meal Details Page
      $(".meal-card a").on("click", async function (e) {
        $(".loaderContainer-inner").fadeIn(300);
        $("#searchResults").hide(0);
        $(".sidebar").animate({ left: -sideBarInner }, 500);
        navBarBtn.children("i").removeClass("fa-x");
        navBarBtn.children("i").addClass("fa-bars");
        let mealid = $(e.target).attr("data-id");

        $("#main-data").html(await getMealDetails(mealid));
        $(".loaderContainer-inner").fadeOut(500);
      });
    });

    $("#searchByFirstLetter").on("input", async function (e) {
      $("#searchByName").val("");
      $("#searchResults").html(
        await searchMealByFirstLetter($(e.target).val())
      );
      $("#searchResults").show(0);

      // Get Meal Details Page
      $(".meal-card a").on("click", async function (e) {
        $(".loaderContainer-inner").fadeIn(300);
        $("#searchResults").hide(0);
        $(".sidebar").animate({ left: -sideBarInner }, 500);
        navBarBtn.children("i").removeClass("fa-x");
        navBarBtn.children("i").addClass("fa-bars");
        let mealid = $(e.target).attr("data-id");

        $("#main-data").html(await getMealDetails(mealid));
        $(".loaderContainer-inner").fadeOut(500);
      });
    });

    $(".loaderContainer-inner").fadeOut(500);
  });
});

// Get Categories
$("#categories").on("click", async function () {
  $(".loaderContainer-inner").fadeIn(300);

  $(".sidebar").animate({ left: -sideBarInner }, 500);
  navBarBtn.children("i").removeClass("fa-x");
  navBarBtn.children("i").addClass("fa-bars");
  $("#main-data").html(await getCategories());

  // Get Meals by Category
  $(".cat-card a").on("click", async function (e) {
    $(".loaderContainer-inner").fadeIn(300);
    $(".sidebar").animate({ left: -sideBarInner }, 500);
    navBarBtn.children("i").removeClass("fa-x");
    navBarBtn.children("i").addClass("fa-bars");
    let mealid = $(e.target).attr("data-id");
    $("#main-data").html(await getMealsByCategory(mealid));

    // Get Meal Details Page
    $(".meal-card a").on("click", async function (e) {
      $(".loaderContainer-inner").fadeIn(300);
      $(".sidebar").animate({ left: -sideBarInner }, 500);
      navBarBtn.children("i").removeClass("fa-x");
      navBarBtn.children("i").addClass("fa-bars");
      let mealid = $(e.target).attr("data-id");

      $("#main-data").html(await getMealDetails(mealid));
      $(".loaderContainer-inner").fadeOut(500);
    });

    $(".loaderContainer-inner").fadeOut(500);
  });

  $(".loaderContainer-inner").fadeOut(500);
});

// Get Areas
$("#area").on("click", async function () {
  $(".loaderContainer-inner").fadeIn(300);
  $(".sidebar").animate({ left: -sideBarInner }, 500);
  navBarBtn.children("i").removeClass("fa-x");
  navBarBtn.children("i").addClass("fa-bars");
  $("#main-data").html(await getAreas());

  //Get Meals By Area
  $(".area-card a").on("click", async function (e) {
    $(".loaderContainer-inner").fadeIn(300);
    $(".sidebar").animate({ left: -sideBarInner }, 500);
    navBarBtn.children("i").removeClass("fa-x");
    navBarBtn.children("i").addClass("fa-bars");
    let mealid = $(e.target).attr("data-id");
    $("#main-data").html(await filterAreaByCity(mealid));

    // Get Meal Details Page
    $(".meal-card a").on("click", async function (e) {
      $(".loaderContainer-inner").fadeIn(300);
      $(".sidebar").animate({ left: -sideBarInner }, 500);
      navBarBtn.children("i").removeClass("fa-x");
      navBarBtn.children("i").addClass("fa-bars");
      let mealid = $(e.target).attr("data-id");

      $("#main-data").html(await getMealDetails(mealid));
      $(".loaderContainer-inner").fadeOut(500);
    });

    $(".loaderContainer-inner").fadeOut(500);
  });
  $(".loaderContainer-inner").fadeOut(500);
});

// Get ingrediants
$("#ingr").on("click", async function () {
  $(".loaderContainer-inner").fadeIn(300);
  $(".sidebar").animate({ left: -sideBarInner }, 500);
  navBarBtn.children("i").removeClass("fa-x");
  navBarBtn.children("i").addClass("fa-bars");
  $("#main-data").html(await getIngredients());

  // Get Meals by Ingrediants

  $(".ing-card a").on("click", async function (e) {
    $(".loaderContainer-inner").fadeIn(300);
    $(".sidebar").animate({ left: -sideBarInner }, 500);
    navBarBtn.children("i").removeClass("fa-x");
    navBarBtn.children("i").addClass("fa-bars");
    let mealid = $(e.target).attr("data-id");
    $("#main-data").html(await getMealsByIngrediants(mealid));

    // Get Meal Details Page
    $(".meal-card a").on("click", async function (e) {
      $(".loaderContainer-inner").fadeIn(300);
      $(".sidebar").animate({ left: -sideBarInner }, 500);
      navBarBtn.children("i").removeClass("fa-x");
      navBarBtn.children("i").addClass("fa-bars");
      let mealid = $(e.target).attr("data-id");

      $("#main-data").html(await getMealDetails(mealid));
      $(".loaderContainer-inner").fadeOut(500);
    });

    $(".loaderContainer-inner").fadeOut(500);
  });

  $(".loaderContainer-inner").fadeOut(500);
});

// Get contact us

$("#contact").on("click", function () {
  $(".sidebar").animate({ left: -sideBarInner }, 500);
  navBarBtn.children("i").removeClass("fa-x");
  navBarBtn.children("i").addClass("fa-bars");

  $(".loaderContainer-inner").fadeIn(500, function () {
    $("#main-data").html(`        <div
    class="contact min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="container w-75 text-center">
      <div class="row g-4">
        <div class="col-md-6">
          <input
            id="nameInput"

            type="text"
            class="form-control"
            placeholder="Enter Your Name"
          />
          <div
            id="nameAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="emailInput"

            type="email"
            class="form-control"
            placeholder="Enter Your Email"
          />
          <div
            id="emailAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="phoneInput"

            type="text"
            class="form-control"
            placeholder="Enter Your Phone"
          />
          <div
            id="phoneAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="ageInput"

            type="number"
            class="form-control"
            placeholder="Enter Your Age"
          />
          <div
            id="ageAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Enter valid age
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="passwordInput"

            type="password"
            class="form-control"
            placeholder="Enter Your Password"
          />
          <div
            id="passwordAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Enter valid password *Minimum eight characters, at least one
            letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input
            id="repasswordInput"

            type="password"
            class="form-control"
            placeholder="Repassword"
          />
          <div
            id="repasswordAlert"
            class="alert alert-danger w-100 mt-2 d-none"
            wfd-invisible="true"
          >
            Enter valid repassword
          </div>
        </div>
      </div>
      <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled>
        Submit
      </button>
    </div>
  </div>`);

    $(document).ready(function () {
      $(
        "#nameInput, #emailInput, #phoneInput, #ageInput, #passwordInput, #repasswordInput"
      ).on("input", function () {
        var nameRegex = /^[a-zA-Z ]+$/;
        var emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var phoneRegex =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        var repasswordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

        $("#nameInput").on("input", function (e) {
          if (nameRegex.test($(e.target).val())) {
            $("#nameAlert").removeClass("d-block");
            $("#nameAlert").addClass("d-none");
          } else {
            $("#nameAlert").removeClass("d-none");
            $("#nameAlert").addClass("d-block");
          }
        });

        $("#emailInput").on("input", function (e) {
          if (emailRegex.test($(e.target).val())) {
            $("#emailAlert").removeClass("d-block");
            $("#emailAlert").addClass("d-none");
          } else {
            $("#emailAlert").removeClass("d-none");
            $("#emailAlert").addClass("d-block");
          }
        });

        $("#phoneInput").on("input", function (e) {
          if (phoneRegex.test($(e.target).val())) {
            $("#phoneAlert").removeClass("d-block");
            $("#phoneAlert").addClass("d-none");
          } else {
            $("#phoneAlert").removeClass("d-none");
            $("#phoneAlert").addClass("d-block");
          }
        });

        $("#ageInput").on("input", function (e) {
          if (ageRegex.test($(e.target).val())) {
            $("#ageAlert").removeClass("d-block");
            $("#ageAlert").addClass("d-none");
          } else {
            $("#ageAlert").removeClass("d-none");
            $("#ageAlert").addClass("d-block");
          }
        });

        $("#passwordInput").on("input", function (e) {
          if (passwordRegex.test($(e.target).val())) {
            $("#passwordAlert").removeClass("d-block");
            $("#passwordAlert").addClass("d-none");
          } else {
            $("#passwordAlert").removeClass("d-none");
            $("#passwordAlert").addClass("d-block");
          }
        });

        $("#repasswordInput").on("input", function (e) {
          if (repasswordRegex.test($(e.target).val())) {
            $("#repasswordAlert").removeClass("d-block");
            $("#repasswordAlert").addClass("d-none");
          } else {
            $("#repasswordAlert").removeClass("d-none");
            $("#repasswordAlert").addClass("d-block");
          }
        });

        if (
          $("#nameInput").val().match(nameRegex) &&
          $("#emailInput").val().match(emailRegex) &&
          $("#phoneInput").val().match(phoneRegex) &&
          $("#ageInput").val().match(ageRegex) &&
          $("#passwordInput").val().match(passwordRegex) &&
          $("#repasswordInput").val().match(repasswordRegex)
        ) {
          if ($("#passwordInput").val() == $("#repasswordInput").val()) {
            $("#submitBtn").removeAttr("disabled"); // enable the submit button
          } else {
            $("#submitBtn").attr("disabled", true); // disable the submit button
          }
        }
      });
    });

    $(".loaderContainer-inner").fadeOut(300);
  });
});

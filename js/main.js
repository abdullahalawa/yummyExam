import {
  getHomepageDate,
  getMealDetails,
  getCategories,
  getMealsByCategory,
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

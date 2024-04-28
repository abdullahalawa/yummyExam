import { getHomepageDate, getMealDetails } from "./api.js";

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

// Get Meal Details
$(".meal-card a").on("click", async function (e) {
  let mealid = $(e.target).attr("data-id");
  $("#main-data").html(await getMealDetails(mealid));
});

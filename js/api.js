// Get Homepage Data
export async function getHomepageDate() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );

  let data = await response.json();

  let counter = 0;
  let htmldata = "";

  //   console.log(data.meals[0]);

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[counter].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[counter].strMealThumb}"
            data-id="${data.meals[counter].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[counter].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[counter].idMeal}">${data.meals[counter].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;

    counter++;
  }
  return htmldata;
}

// Get Meal details page
export async function getMealDetails(mealId) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  let data = await response.json();

  let recips = ``;
  let tags = ``;

  console.log(data.meals[0]);

  for (let i = 1; i <= 20; i++) {
    if (data.meals[0][`strIngredient${i}`]) {
      recips += `<li class="alert alert-info m-2 p-1">${
        data.meals[0][`strMeasure${i}`]
      } ${data.meals[0][`strIngredient${i}`]}</li>`;
    }
  }

  if (data.meals[0][`strTags`]) {
    let editedTags = data.meals[0][`strTags`].split(",");

    for (const tag in editedTags) {
      tags += ` <li class="alert alert-danger m-2 p-1">${editedTags[tag]}</li>`;
    }
  }

  let htmlData = `<div class="col-md-4">
  <img
    class="w-100 mb-2 rounded"
    src="${data.meals[0].strMealThumb}"
    alt=""/>
  <h3 class="text-white fs-2">${data.meals[0].strMeal}</h3>
</div>
<div class="col-md-8">
  <h3 class="text-white fs-2">Instructions</h3>
  <p class="text-white">
    ${data.meals[0].strInstructions}
  </p>
  <h3 class="fw-bold text-white">
    Area : <span class="fw-medium">${data.meals[0].strArea}</span>
  </h3>
  <h3 class="fw-bold text-white">
    Category : <span class="fw-medium">${data.meals[0].strCategory}</span>
  </h3>
  <h3 class="text-white fs-2">Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${recips}
  </ul>

  <h3 class="text-white fs-2">Tags :</h3>

  <ul class="list-unstyled d-flex g-3 flex-wrap">
${tags}
  </ul>

  <a
    target="_blank"
    href="${data.meals[0].strSource}"
    class="btn btn-success"
    >Source</a>
  <a
    target="_blank"
    href="${data.meals[0].strYoutube}"
    class="btn btn-danger"
    >Youtube</a>
</div>`;

  return htmlData;
}

// Search meal by name
export async function searchMealByName(mealName) {}

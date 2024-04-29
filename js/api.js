// Get Homepage Data
export async function getHomepageDate() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );

  let data = await response.json();

  let htmldata = "";

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}"
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Get categories
export async function getCategories() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let data = await response.json();

  let htmldata = "";

  for (const cat in data.categories) {
    let desc = data.categories[cat].strCategoryDescription;
    let first100 = desc.slice(0, 100);

    htmldata += `
    
    <div class="col-md-3">
      <div class="cat-card">
        <a href="#" data-id="${data.categories[cat].strCategory}">
          <img
            class="w-100 rounded"
            src="${data.categories[cat].strCategoryThumb}"
            data-id="${data.categories[cat].strCategory}"
            alt=""
          />
          <div
            class="overlay d-flex flex-column justify-content-center align-items-center p-2" data-id="${data.categories[cat].strCategory}"
          >
            <h3 class="meal-name text-black" data-id="${data.categories[cat].strCategory}">${data.categories[cat].strCategory}</h3>
            <p class="text-black" data-id="${data.categories[cat].strCategory}">${first100}</p>
          </div>
        </a>
      </div>
    </div>`;

    // counter++;
  }
  return htmldata;
}

// Get Meals by Category
export async function getMealsByCategory(catName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`
  );

  let data = await response.json();

  let htmldata = "";

  // console.log(data);

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}" 
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
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

// Get Areas Page
export async function getAreas() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let data = await response.json();

  let htmldata = "";

  for (const area in data.meals) {
    htmldata += `
    
    <div class="col-md-3">
      <div class="area-card ">
        <a class="text-decoration-none d-flex flex-column justify-content-center align-items-center" href="#" data-id="${data.meals[area].strArea}">
        <i class="fa-solid fa-house-laptop fs-1 text-white" data-id="${data.meals[area].strArea}"></i>
        <h3 class="text-white text-decoration-none" data-id="${data.meals[area].strArea}">${data.meals[area].strArea}</h3>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Get meals by area
export async function filterAreaByCity(City) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${City}`
  );

  let data = await response.json();

  let htmldata = "";

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}"
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Get Ingredients Page
export async function getIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let data = await response.json();

  let htmldata = "";
  let first100 = "";
  let desc = "";

  for (const ingr in data.meals) {
    if (data.meals[ingr].strDescription != null) {
      desc = data.meals[ingr].strDescription;
      first100 = desc.slice(0, 100);
    } else {
      desc = "";
      first100 = "";
    }

    if (ingr == 20) {
      break;
    }

    // console.log(first100);

    htmldata += `
    
    <div class="col-md-3">
      <div class="ing-card">
        <a class="text-decoration-none d-flex flex-column justify-content-center align-items-center" href="#" data-id="${data.meals[ingr].strIngredient}">
        <i class="fa-solid fa-drumstick-bite fs-1 text-white" data-id="${data.meals[ingr].strIngredient}"></i>
        <h3 class="text-white text-decoration-none" data-id="${data.meals[ingr].strIngredient}">${data.meals[ingr].strIngredient}</h3>
        <p class="text-white text-decoration-none" data-id="${data.meals[ingr].strIngredient}">${first100}</p>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Get meals by ingrediants
export async function getMealsByIngrediants(ingrediant) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`
  );

  let data = await response.json();

  let htmldata = "";

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}"
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Search meal by name
export async function searchMealByName(mealName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );

  let data = await response.json();

  let htmldata = "";

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}"
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

// Search meal by first letter
export async function searchMealByFirstLetter(letter) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );

  let data = await response.json();

  let htmldata = "";

  for (const meal in data.meals) {
    htmldata += `<div class="col-md-3">
      <div class="meal-card">
        <a href="#" data-id="${data.meals[meal].idMeal}">
          <img
            class="w-100 rounded"
            src="${data.meals[meal].strMealThumb}"
            data-id="${data.meals[meal].idMeal}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2" data-id="${data.meals[meal].idMeal}"
          >
            <h3 class="meal-name text-black" data-id="${data.meals[meal].idMeal}">${data.meals[meal].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;
  }
  return htmldata;
}

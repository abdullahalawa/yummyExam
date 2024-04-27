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
        <a href="#">
          <img
            class="w-100 rounded"
            src="${data.meals[counter].strMealThumb}"
            alt=""
          />
          <div
            class="overlay d-flex justify-content-start align-items-center p-2"
          >
            <h3 class="meal-name text-black">${data.meals[counter].strMeal}</h3>
          </div>
        </a>
      </div>
    </div>`;

    counter++;

    console.log(htmldata);
  }
  return htmldata;
}

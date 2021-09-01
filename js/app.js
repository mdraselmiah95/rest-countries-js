const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const countryContainer = document.getElementById("country-container");
const countryDetails = document.getElementById("country-details");
const showError = document.getElementById("error");
const spinner = document.getElementById("spinner");

searchBtn.addEventListener("click", function () {
  const search = searchInput.value;
  spinner.style.display = "none";
  if (search === "") {
    showError.innerText = "Search field cannot be empty.";
    return;
  }
  searchInput.value = "";
  countryContainer.innerHTML = "";

  const url = `https://restcountries.eu/rest/v2/name/${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountry(data));
});

const displayCountry = (countries) => {
  //   console.log(countries);

  //Error handle
  if (countries.status === 404) {
    showError.innerText = "No Result Found";
  } else {
    showError.innerText = "";
    countries.forEach((country) => {
      // console.log(country.alpha3Code);

      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div class="card p-2">
                <img src="${country.flag}" class="card-img-top img-fluid" alt="country flag" />
                <div class="card-body">
                    <h3 class="card-title text-success fw-bold">${country.name}</h3>
                    <h4 class="text-info">Name of the capital: ${country.capital}</h4>
                </div>
                 <button onclick="showCountryDetails('${country.alpha3Code}')" class="btn btn-outline-info">LEARN MORE</button>
            </div>    
      `;

      countryContainer.appendChild(div);
    });
  }
};

const showCountryDetails = (code) => {
  fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

const showDetails = (name) => {
  console.log(name.flag);
  console.log(name.currencies[0].name);
  countryDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src = "${name.flag}" class = "card-img-top img-fluid" alt = "meal picture">
          <div class = "card-body">
              <h3 class = "card-title fw-bolder text-warning"> ${name.currencies[0].name} </h3>
              <p class = "card-text"> ${name.currencies[0].symbol} </p>
          </div>
      `;
  countryDetails.appendChild(div);
};

var watchModeAPIKey = "cyPS2JJNj27Fr0x0pSjOTODxN6dTVevI4RLztRvb";
var OMDbAPIKey = "2f57da20";
var buttonsEl = document.querySelector("#search-section");
var bookMoviesEl = document.querySelector("#book-movies");
var sadMoviesEl = document.querySelector("#sad-movies");
var scaryMoviesEl = document.querySelector("#scary-movies");
var comedyMoviesEl = document.querySelector("#comedy-movies");
var romanceMoviesEl = document.querySelector("#romance-movies");
var actionMoviesEl = document.querySelector("#action-movies");
var streamUl = document.querySelector("#ul-stream");
var streamResultsEl = document.querySelector("#stream-container");
var movieResultsEl = document.querySelector("#result-content");

var bookMovies = [
  "Dune",
  "Harry Potter",
  "Pride & Prejudice",
  "Twilight",
  "Lord of the Rings",
  "Holes",
  "The Hunger Games",
  "To Kill a Mockingbird",
  "The Godfather",
  "Forrest Gump",
  "The Green Mile",
  "The Princess Bride",
];
var sadMovies = [
  "The Fault In Our Stars",
  "Marley and Me",
  "Titanic",
  "The Boy in the Striped Pajamas",
  "Me Before You",
  "My Girl",
  "Stepmom",
  "The Pursuit of Happyness",
  "I Am Legend",
  "Remember The Titans",
  "Radio",
];
var scaryMovies = [
  "The Conjuring",
  "House of Wax",
  "The Grudge",
  "It",
  "Thirteen Ghosts",
  "Texas Chainsaw Massacre",
  "Arachnaphobia",
  "The Shining",
  "Hellraiser",
  "The Skeleton Key",
];
var comedyMovies = [
  "Step Brothers",
  "Bad Daddy",
  "Superbad",
  "Mean Girls",
  "Bridesmaids",
  "White Chicks",
  "Bad Grandpa",
  "Dodgeball",
  "Zoolander",
  "The Other Guys",
  "Sausage Party",
  "Office Space",
  "Bad Teacher",
  "Due Date",
];
var romanceMovies = [
  "The Notebook",
  "Pride & Prejudice",
  "Brokeback Mountain",
  "Where The Crawdads Sing",
  "Titanic",
  "Wedding Crashers",
  "Dirty Dancing",
  "Grease",
  "Pretty Woman",
  "Along Came Polly",
  "Fifty Shades of Gray",
  "The Spectacular Now",
  "Beauty and the Beast",
];
var actionMovies = [
  "Armageddon",
  "Transformers",
  "The Expendables",
  "The Incredibles",
  "Thor",
  "The Batman",
  "Goldfinger",
  "Avengers",
  "Pulp Fiction",
  "John Wick",
  "Inception",
  "The Glass Onion",
  "Heat",
];

var buttonClickHandler = function (event) {
  var clickedButton = event.target.getAttribute("id");
  console.log(clickedButton);

  if (clickedButton === "book-movies") {
    var randomBookMovie =
      bookMovies[Math.floor(Math.random() * bookMovies.length)];
    console.log(randomBookMovie);
    getMovie(randomBookMovie);
  } else if (clickedButton === "sad-movies") {
    var randomSadMovie =
      sadMovies[Math.floor(Math.random() * sadMovies.length)];
    console.log(randomSadMovie);
    getMovie(randomSadMovie);
  } else if (clickedButton === "scary-movies") {
    var randomScaryMovie =
      scaryMovies[Math.floor(Math.random() * scaryMovies.length)];
    console.log(randomScaryMovie);
    getMovie(randomScaryMovie);
  } else if (clickedButton === "comedy-movies") {
    var randomComedyMovie =
      comedyMovies[Math.floor(Math.random() * comedyMovies.length)];
    console.log(randomComedyMovie);
    getMovie(randomComedyMovie);
  } else if (clickedButton === "romance-movies") {
    var randomRomanceMovie =
      romanceMovies[Math.floor(Math.random() * romanceMovies.length)];
    console.log(randomRomanceMovie);
    getMovie(randomRomanceMovie);
  } else if (clickedButton === "action-movies") {
    var randomActionMovie =
      actionMovies[Math.floor(Math.random() * actionMovies.length)];
    console.log(randomActionMovie);
    getMovie(randomActionMovie);
  }
};

let getMovie = function (movie) {
  console.log(movie);
  var queryURL =
    "http://www.omdbapi.com/?apikey=a454390f&page=2&type=movie&t=" + movie;

  fetch(queryURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        var imdbID = data.imdbID;
        console.log(imdbID);
        getStream(imdbID);

        let title = data.Title;
        let year = data.Year;
        let rated = data.Rated;
        let released = data.Released;
        let actors = data.Actors;
        let genre = data.Genre;
        let language = data.Language;
        let plot = data.Plot;
        let poster = data.Poster;

        document.getElementById("movieTitle").innerHTML = `${title}`;
        document.getElementById(
          "moviePoster"
        ).innerHTML = `<img src=${poster}>`;
        document.getElementById("movieYear").innerHTML = `Year: ${year}`;
        document.getElementById("movieRated").innerHTML = `Rated: ${rated}`;
        document.getElementById(
          "movieReleased"
        ).innerHTML = `Released: ${released}`;
        document.getElementById("movieActors").innerHTML = `Actors: ${actors}`;
        document.getElementById("movieGenre").innerHTML = `Genre: ${genre}`;
        document.getElementById(
          "movieLanguage"
        ).innerHTML = `Language: ${language}`;
        document.getElementById("moviePlot").innerHTML = `Plot: ${plot}`;
        movieResultsEl.className = "show-results";
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

let getStream = function (imdbID) {
  console.log(imdbID);
  let streamURL =
    "https://api.watchmode.com/v1/title/" +
    imdbID +
    "/sources/?apiKey=" +
    watchModeAPIKey;

  fetch(streamURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        var streamName = data[0].name;
        var streamPrice = data[0].price;
        var streamType = data[0].type;
        var streamUrl = data[0].web_url;
        document.getElementById("sname").innerHTML =
          "Streaming Service: " + streamName;
        document.getElementById("sprice").innerHTML = "Price: $" + streamPrice;
        document.getElementById("stype").innerHTML =
          "Rent or Buy: " + streamType;
        document.getElementById("surl").innerHTML =
          "Streaming Website: " + streamUrl;
        document.getElementById(
          "surl"
        ).innerHTML = `Streaming Website:  <a href=${streamUrl}>${streamUrl}</a>`;
        //Will uncomment out once css is updated
        streamResultsEl.className = "show-results";
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};
//event listeners
buttonsEl.addEventListener("click", buttonClickHandler);

// geting movie details from API through the search box
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";wrapper
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`
      );
      const movieDetails = await result.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b>${details.Awards}</p>
    </div>
    `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});

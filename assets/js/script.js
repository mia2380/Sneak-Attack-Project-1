const watchModeAPIKey = "kz5MfbHhvGeO63uJKs1zv4Rmnsc1ZhxUnaXubqci";
// const OMDbAPIKey = "2f57da20";
const OMDbAPIKey = "1b466f0a";
const buttonsEl = document.querySelector("#search-section");
const bookMoviesEl = document.querySelector("#book-movies");
const sadMoviesEl = document.querySelector("#sad-movies");
const scaryMoviesEl = document.querySelector("#scary-movies");
const comedyMoviesEl = document.querySelector("#comedy-movies");
const romanceMoviesEl = document.querySelector("#romance-movies");
const actionMoviesEl = document.querySelector("#action-movies");
const streamUl = document.querySelector("#ul-stream");
const streamResultsEl = document.querySelector("#stream-container");
const movieResultsEl = document.querySelector("#result-content");
const resultGrid = document.getElementById("result-grid");
const searchHistoryEl = document.getElementById("search-history-header");
const searchHistoryList = document.querySelector('#show-movie');

var bookMovies = [
	"Dune",
	"Harry Potter",
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
	"Marley & Me",
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
	"13 Ghosts",
	"Texas Chainsaw Massacre",
	"Arachnophobia",
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
	"Bad Teacher",
	"Office Space",
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
	"Fifty Shades of Grey",
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
	"The Avengers",
	"Pulp Fiction",
	"John Wick",
	"Inception",
	"Glass Onion: A Knives Out Mystery",
	"Heat",
];

//generate random movie from array based on genre user selected
let buttonClickHandler = function (event) {
	var clickedButton = event.target.getAttribute("id");

	if (clickedButton === "book-movies") {
		var randomMovie = bookMovies[Math.floor(Math.random() * bookMovies.length)];
	} else if (clickedButton === "sad-movies") {
		var randomMovie = sadMovies[Math.floor(Math.random() * sadMovies.length)];
	} else if (clickedButton === "scary-movies") {
		var randomMovie = scaryMovies[Math.floor(Math.random() * scaryMovies.length)];
	} else if (clickedButton === "comedy-movies") {
		var randomMovie = comedyMovies[Math.floor(Math.random() * comedyMovies.length)];
	} else if (clickedButton === "romance-movies") {
		var randomMovie = romanceMovies[Math.floor(Math.random() * romanceMovies.length)];
	} else if (clickedButton === "action-movies") {
		var randomMovie = actionMovies[Math.floor(Math.random() * actionMovies.length)];
	}
	getMovie(randomMovie);
	localStorage.setItem(randomMovie, randomMovie);
	searchHistory();
};

let searchHistory = function () {
	let values = [], keys = Object.keys(localStorage).sort(), i = keys.length;
	while (i--) { values.push(localStorage.getItem(keys[i])); }
	let ul = document.getElementsByTagName("ul")[0];
	//to prevent logging previous searched movies
	ul.innerHTML = "";
	searchHistoryEl.textContent = "Movie Search History:";
	for (i = 0; i < values.length; i++) {
		let li = document.createElement("li");
		li.textContent = values[i];
		ul.prepend(li);
		//gives the list items an attribute so it can be clicked on and will display the movie details again when buttonClickHandler() is called
		li.setAttribute("id", values[i]);
	}
}
searchHistory();

let getMovie = function (movie) {
	console.log(movie);
	var queryURL = "http://www.omdbapi.com/?apikey=a454390f&page=2&type=movie&t=" + movie;

	fetch(queryURL).then(function (response) {
		if (response.ok) {
			console.log(response);
			response.json().then(function (data) {
				console.log(data);
				var imdbID = data.imdbID;
				console.log(imdbID);
				getStream(imdbID);

				resultGrid.innerHTML = `
		<div class = "movie-poster">
			<img src = "${data.Poster != "N/A" ? data.Poster : "image_not_found.png"}" alt = "movie poster">
		</div>
		<div class = "movie-info">
			<h3 class = "movie-title">${data.Title}</h3>
			<ul class = "movie-misc-info">
				<li class = "year">Year: ${data.Year}</li>
				<li class = "rated">Ratings: ${data.Rated}</li>
				<li class = "released">Released: ${data.Released}</li>
			</ul>
			<p class = "genre"><b>Genre:</b> ${data.Genre}</p>
			<p class = "writer"><b>Writer:</b> ${data.Writer}</p>
			<p class = "actors"><b>Actors: </b>${data.Actors}</p>
			<p class = "plot"><b>Plot:</b> ${data.Plot}</p>
			<p class = "language"><b>Language:</b> ${data.Language}</p>
			<p class = "awards"><b><i class = "fas fa-award"></i></b>${data.Awards}</p>
		</div>
		`;

			});
		} else {
			let modal = document.getElementById("errorModal");
			let errorModalText = document.getElementById("errorModalText");
			if (errorModalText) {
				errorModalText.textContent = "Error, please try again." + response.statusText;
				modal.style.display = "block";
			}
		}
	});
};

let getStream = function (imdbID) {
	let streamURL = "https://api.watchmode.com/v1/title/" + imdbID + "/sources/?apiKey=" + watchModeAPIKey;

	fetch(streamURL).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				var streamName = data[0].name;
				var streamPrice = data[0].price;
				var streamType = data[0].type;
				var streamUrl = data[0].web_url;
				document.getElementById("sname").innerHTML = `<span>Streaming Service:</span> ${streamName}`;
				if (!streamPrice) {
					document.getElementById("sprice").innerHTML = `<span>Price not available</span>`;
				}
				else {
					document.getElementById("sprice").innerHTML = `<span>Price:</span> $${streamPrice}`;
				}
				document.getElementById("stype").innerHTML = `<span>How to Stream:</span> ${streamType}`;
				document.getElementById("surl").innerHTML = `<span>Streaming Website:</span> ${streamUrl}`;
				document.getElementById("surl").innerHTML = `<span>Streaming Website:</span>  <a href=${streamUrl}>${streamUrl}</a>`;
				streamResultsEl.className = "show-results";
			});
		} else {
			let modal = document.getElementById("errorModal");
			let errorModalText = document.getElementById("errorModalText");
			if (errorModalText) {
				errorModalText.textContent = "Error, please try again." + response.statusText;
				modal.style.display = "block";
			}
		}
	});
};

let getClickedSearchHistory = function (event) {
	let clickedSearhHistory = event.target.getAttribute('id');
	getMovie(clickedSearhHistory);
}
//event listeners
buttonsEl.addEventListener("click", buttonClickHandler);
searchHistoryList.addEventListener("click", getClickedSearchHistory);

// geting movie details from API through the search box
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
// const resultGrid = document.getElementById("result-grid");

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
			searchList.classList.add("hide-search-list");
			movieSearchBox.value = ""; wrapper
			const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
			const movieDetails = await result.json();
			displayMovieDetails(movieDetails);
		});
	});
}

function displayMovieDetails(details) {
	const imdbID = details.imdbID;
	getStream(imdbID);
	resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${details.Poster != "N/A" ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title"> ${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year"><b>Year:</b> ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released"><b>Released:</b> ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors:</b> ${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;

}

let closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function () {
	let modal = document.getElementById("errorModal");
	modal.style.display = "none";
};

window.addEventListener("click", (event) => {
	if (event.target.className != "form-control") {
		searchList.classList.add("hide-search-list");
	}
});

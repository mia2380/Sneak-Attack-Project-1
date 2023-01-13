var watchModeAPIKey = "cyPS2JJNj27Fr0x0pSjOTODxN6dTVevI4RLztRvb";
var OMDbAPIKey = "2f57da20";
var buttonsEl = document.querySelector('#search-section');
var bookMoviesEl = document.querySelector('#book-movies');
var sadMoviesEl = document.querySelector('#sad-movies');
var scaryMoviesEl = document.querySelector('#scary-movies');
var comedyMoviesEl = document.querySelector('#comedy-movies');
var romanceMoviesEl = document.querySelector('#romance-movies');
var actionMoviesEl = document.querySelector('#action-movies');
var movieUl = document.querySelector('#ul-movie');
var streamUl = document.querySelector('#ul-stream');

var bookMovies = ['Dune','Harry Potter'];

var buttonClickHandler = function(event) {
    var clickedButton = event.target.getAttribute('id');
    console.log(clickedButton);

    if (clickedButton = "book-movie") {
        var randomBookMovie = bookMovies[Math.floor(Math.random() * bookMovies.length)];  
        console.log(randomBookMovie);
        getMovie(randomBookMovie);
    }

}

let getMovie = function(movie) {
var queryURL = "http://www.omdbapi.com/?apikey=a454390f&page=2&type=movie&t=" + movie;

    fetch(queryURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                var imdbID = data.imdbID;
                console.log(imdbID);
                getStream(imdbID);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

let getStream = function(imdbID) {
    console.log(imdbID);
	let streamURL = "https://api.watchmode.com/v1/title/" + imdbID + "/sources/?apiKey=" + watchModeAPIKey;

    fetch(streamURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                var streamName = data[0].name;
                var streamPrice = data[0].price;
                var streamType = data[0].type;
                var streamUrl = data[0].web_url;
                document.getElementById("sname").innerHTML="Streaming Service: "+ streamName;
                document.getElementById("sprice").innerHTML="Price: $"+ streamPrice;
                document.getElementById("stype").innerHTML="Rent or Buy: "+ streamType;
                document.getElementById("surl").innerHTML="Streaming Website: "+ streamUrl;

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};

//event listeners
buttonsEl.addEventListener("click", buttonClickHandler);
var watchModeAPIKey = "cyPS2JJNj27Fr0x0pSjOTODxN6dTVevI4RLztRvb";
// watch key url"https://api.watchmode.com/v1/sources/?apiKey=cyPS2JJNj27Fr0x0pSjOTODxN6dTVevI4RLztRvb";
var OMDbAPIKey = "2f57da20"




let getMovie = function(movie) {
var queryURL = "http://www.omdbapi.com/?apikey=a454390f&s=a&per_page=2";

    fetch(queryURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
			// let genre = data.Genre;
			// console.log(genre);


            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};
getMovie();

let getStream = function() {
	let streamURL = "https://api.watchmode.com/v1/sources/?apiKey=" + watchModeAPIKey;

    fetch(streamURL)
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};
getStream();


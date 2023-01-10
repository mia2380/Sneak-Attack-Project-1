var petfinderAPIkey = "iyPla2DNJdCUystNwRaVIGWGPXflX9QGZ8CTKh7UmrsW56CTM4";
var petfinderSecretKey = "DnqfHL61DGSaaEJMYeJVnJAoeSKWIVtozWEScI44";
var zip = '27610';

var apiUrl = 'http://api.petfinder.com/pet.getRandom?key=' + petfinderAPIkey + '&animal=cat&location=' + zip + '&output=basic&format=json&callback=?';

/*
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //var lon = data.coord.lon;
                //var lat = data.coord.lat;
                console.log(data);
            })
        }
    });
    */

    var url = 'http://api.petfinder.com/pet.getRandom?key=' + petfinderAPIkey + '&animal=cat&location=' + zip + '&output=basic&format=json&callback=?';
		
	// Within $.ajax{...} is where we fill out our query 

	$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: petfinderAPIkey,
				animal: 'cat',
				location: zip,
				output: 'basic',
				format: 'json'
			},})
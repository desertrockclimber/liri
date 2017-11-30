
var inquirer = require('inquirer');

var question1 = [

	{
	type: 'list',
	name: 'whatToDo',
	message: "Hi, I'm Liri. What can I do for you?",
	choices: [
	"Search Spotify for a song",
	"See my latest tweets",
	"Search for a movie on OMDB"
	]
	}

	];


	inquirer.prompt(question1).then(function(answers) {
	console.log(JSON.stringify(answers, null, ' '));

//Twitter API======================================// https://apps.twitter.com/app/new

	if (answers.whatToDo == "See my latest tweets") {
		console.log("Cool, lets see what you've tweeted recently");
	var Twitter = require('twitter');

		var keys = require('./keys.js');
		var Twitter = require('twitter');

		var client = new Twitter(keys.twitterkeys);
		var twitterConsumerKey = keys.twitterKeys.consumer_key
        var twitterConsumerSecret = keys.twitterKeys.consumer_secret
        var twitterAccessTokenKey =  keys.twitterKeys.access_token_key
        var twitterAccessTokenSecret = keys.twitterKeys.access_token_secret

       var client = new Twitter({
        consumer_key: twitterConsumerKey,
        consumer_secret: twitterConsumerSecret,
        access_token_key: twitterAccessTokenKey,
        access_token_secret: twitterAccessTokenSecret
       });


	
		var params = {screen_name: 'chrisberryUM'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
	    
	    	for (var i=0; i<tweets.length; i++) {
	    	console.log("================================================================================")
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	
	   	  }
    	}
	});
} 
//Spotify API===============================================================================================================

	if(answers.whatToDo == "Search Spotify for a song"){
		console.log("Nice. Let's find a song.");
		var prompt = require('prompt');
		var keys = require('./keys.js');
		var spotify = require('spotify');
	 	var Spotify = require('node-spotify-api');
	 	prompt.start();

		prompt.get(['song'], function (err, result) {
	    console.log(result.song);
	

	var getArtistNames = function(artist) {
		return artist.name;
	}

		var spotify = new Spotify({
	    id: 'dbbcbd3168ff4491b877f60de6465149',
	    secret: 'f2f3390fbf954be0b5f18457cc36b477'
		});

			spotify.search({ type: 'track', query: result.song}).then(function(response) {
			    
				var songs  = response.tracks.items;
				for (var i=0; i<songs.length; i++) {
					console.log(i);
					console.log('Artist(s): ' + songs[i].artists.map(getArtistNames));
					console.log('Song name: ' + songs[i].name);
					console.log('Preview song: '+ songs[i].preview_url);
					console.log('Album: '+ songs[i].album.name);
					console.log('=======================================================================================================================')
				}
			    


			  })
			  .catch(function(err) {
			    console.log(err);
			    
			  });
			  
			});
			};
// OMDB API =============================================================================
	if (answers.whatToDo == "Search for a movie on OMDB") {

		console.log("Ok. What do you want to watch?");




	var prompt = require('prompt');
	var request = require("request");

	var nodeArgs = process.argv;

	prompt.start();

	prompt.get(['movie'], function (err, result) {
 
    console.log('=============================================================================');
    console.log('');
    console.log('');
    console.log(" " + result.movie + " huh?! Ok...if you like that sort of thing.");
    console.log('=============================================================================');
    console.log('');
    console.log('');


	var queryUrl = "http://www.omdbapi.com/?t=" + result.movie + "&y=&plot=short&apikey=trilogy";

	// console.log(queryUrl);
	console.log('');
    console.log('');

	request(queryUrl, function(error, response, body) {



	console.log("-------------------------See movie information below---------------------------")
    console.log("Title: " + JSON.parse(body).Title);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("===============================================================================")
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("-------------------------------------------------------------------------------")
    console.log("Actors: " + JSON.parse(body).Actors);

    console.log("===============================================================================")

    });
	});
    };

});


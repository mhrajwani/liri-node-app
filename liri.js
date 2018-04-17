require("dotenv").config();

var fs = require ("fs");
var request = require ("request");
var Spotify = require ('node-spotify-api');
var Twitter = require ('twitter');
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var info = process.argv[3];

DoSomething();

function DoSomething(){
switch (action) {
    case "my-tweets":
      tweet();
      break;
    
    case "spotify-this-song":
      spotify();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "do-what-it-says":
      doWhat();
      break;
    }}

function tweet(){
    console.log("this are the tweets");
    var params = {MoProject12: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        console.log(response);
    }
    });


client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
    if (!error) {
        console.log("hi");
      console.log(tweet);
    }
  });
    }

function spotify(){
    console.log("Spotify");
    spotify.search({ type: 'track', query: info }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });

}

function movie(){

var queryUrl = "http://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Ratin: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Release Year: " + JSON.parse(body).Plot);
  }
});
}

function doWhat(){
    fs.readFile("random.txt","utf8",function(error,data){
        if(!error){
            console.log(data);
            data = data.split(",");
            action = data[0];
            info = data[1];
            DoSomething();
        }
        
    })

}
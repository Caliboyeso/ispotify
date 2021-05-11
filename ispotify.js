// DEPENDENCIES PACKAGES
// ==========================================================================
// Using the config() method to read and set environment variables
require("dotenv").config();

// This variable stores the node-spotify-api package
var spotifyPackage = require("node-spotify-api");

// This variable stores the API keys in the keys.js file
var keysJS = require("./keys");

// This variable initializes the spotify API
var spotify = new spotifyPackage(keysJS.spotify);


// FUNCTIONS
// ==========================================================================
// This function returns the aritst name
var getArtistName = function(artist) {
    return artist.name;
};

// This function handles running a spotify search
var getSpotifySong = function(songName) {
    if (songName === undefined) {
        console.log("Uh oh! You must enter a name of a song...");
    }
    // Using the search() method to search for the song and return a match
    spotify.search(
        {
            type: "track",
            query: songName
        },
        // This function returns a song or an error if the song can't be retrieved
        function(err, data) {
            if (err) {
                console.log("Uh oh! An error occurred: " + err);
                return;
            }
            // This variable stores the song 
            var song = data.tracks.items;
            // A for loop to loop through all the matching songs
            for (var i = 0; i < song.length; i++) {
                // A if statement if the number of the song is zero
                if (i === 0) {
                    console.log("--------------------------------------")
                }
                // Number of song
                console.log(i);
                // Name of song
                console.log("Song: " + song[i].name);
                // Name of artist
                console.log("Artist: " + song[i].artists.map(getArtistName));
                // Name of album
                console.log("Album: " + song[i].album.name);
                // A link to preview the song
                console.log("Preview song: " + song[i].preview_url);
                console.log("--------------------------------------")
            }
        }
    );
};

// This function handles executing the spotify search command
var runCommand = function(caseData, functionData) {
    // A switch statement to evaluate an expression and return a match
    switch (caseData) {
        case "spotify-song":
            getSpotifySong(functionData);
            break;
        default:
            console.log("Uh oh! The song you searched for cannot be found. Please try again...");
    }
};

// This function takes in command line arguments and executes the correct function accordingly
var runSpotify = function(argOne, argTwo) {
    runCommand(argOne, argTwo);
};


// MAIN PROCESS
// ==========================================================================
// Calling the runSpotify() function
runSpotify(process.argv[2], process.argv.slice(3).join(" "));
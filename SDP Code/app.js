//Required node packages
const path = require('path');
const fs = require('fs');
const express = require('express');
const { subscribe } = require('diagnostics_channel');

//Assigning root directory, client folder within running directory
const root = path.join(__dirname, 'client')

//Assigning locations of directories for satellite images and enwin data
const imagesPath = path.join(__dirname, '..', 'Sample Images')
const emwinPath = path.join(__dirname, '..', 'EMWIN')

//Default user location abbreviation
var userLocation = "CLE";

//innitialize express app
const app = express();

//listen for requests on port 3000
app.listen(3000);

app.use(express.static(root));

//reroute requests to /images and /emwin to the correct local directory
app.use('/images', express.static(imagesPath));
app.use('/emwin', express.static(emwinPath));


//sends designated html doc for requests for the following web pages
app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: root });
});

app.get('/live_data', (req, res) => {
    res.sendFile('./live_data.html', { root: root });
});

app.get('/historic_data', (req, res) => {
    res.sendFile('./historic_data.html', { root: root });
});

app.get('/location', (req, res) => {
    res.sendFile('./location.html', { root: root });
});

/* any request to /filepath will have the params for the desired sector and image type in the url params, 
when get request is made server sends back list of filenames contained within the specified directory */
app.get('/filepath', (req, res) => {
    const queryParams = req.query;
    //console.log(queryParams['sector']);
    //console.log(queryParams['type']);

    //set response type to be plain text
    res.setHeader('Content-Type', 'text/plain');
    //create path to directory containing desired image files
    const directoryPath = path.join('../Sample Images', queryParams['sector'], queryParams['type']);
    //initialize response
    var responseText = "";
    //reads files in directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        //for each file append its file path to the response string with a comma seperator
        files.forEach(file => {
            responseText += '/images/' + path.join(queryParams['sector'], queryParams['type'], file.toString()) + ',';
            //console.log(file);
        });
        //remove last comma before sending response
        responseText = responseText.slice(0, -1);
        res.send(responseText);
        //console.log(newStr);
    });
});

//visiting /get_loc tells server to send the current user location abbreviation, this is useful as the client side javascript is 
//restarted when new pages are loaded.
app.get('/get_loc', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(userLocation);
});

//visiting /send_loc tells server user has changed their location settings, with the new location within the url params.
//Server will save this as the users location
app.get('/send_loc', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const queryParams = req.query;
    userLocation = queryParams['location'];
    res.send(userLocation);
});

//requests to emwin will return a list of all emwin text files pertaining to users current location
app.get('/get_emwin', (req, res) => {
    //set response type to plain text
    res.setHeader('Content-Type', 'text/plain');
    //initialize response string
    var responseText = "";
    //iterate through all files in directory
    fs.readdir("../EMWIN", (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        //for each file gets string of name, then a substring containing the location abbreviation of the sending weather station. 
        //This will correspond to the users location. For each file containing correct substring appends to response text.
        files.forEach(file => {
            if (file.toString() != '.gitignore') {
                filename = file.toString();
                substring = filename.split('_')[1].split(/(\d+)/)[2];
                console.log(substring);
                if (substring.includes(userLocation)) {
                    responseText += '/emwin/' + filename + ',';
                }
            }
        });
        //remove last comma
        if (responseText != "") {
            responseText = responseText.slice(0, -1);
        }
        res.send(responseText);
        //console.log(newStr);
    });
});

//fun easteregg if you visit this page
app.get('/themeaningoflifetheuniverseandeverything', (req, res) => {
    res.send('<h1>42</h1>');
});



//if desired url is not any of the above options, send 404 error page
app.use((req, res) => {
    res.status(404).sendFile('./404.html', { root: root });
});
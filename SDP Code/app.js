const path = require('path');
const fs = require('fs');
const express = require('express');
const { subscribe } = require('diagnostics_channel');
const root = path.join(__dirname, 'client')
const imagesPath = path.join(__dirname, '..', 'Sample Images')
const emwinPath = path.join(__dirname, '..', 'EMWIN')
var userLocation = "CLE";

//express app
const app = express();

//listen for requests
app.listen(3000);

app.use(express.static(root));

app.use('/images', express.static(imagesPath));
app.use('/emwin', express.static(emwinPath));

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

app.get('/filepath', (req, res) => {
    const queryParams = req.query;
    //console.log(queryParams['sector']);
    //console.log(queryParams['type']);

    res.setHeader('Content-Type', 'text/plain');
    const directoryPath = path.join('../Sample Images', queryParams['sector'], queryParams['type']);
    var responseText = "";
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            responseText += '/images/' + path.join(queryParams['sector'], queryParams['type'], file.toString()) + ',';
            //console.log(file);
        });
        const newStr = responseText.slice(0, -1);
        res.send(newStr);
        //console.log(newStr);
    });
});

app.get('/get_loc', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(userLocation);
});

app.get('/send_loc', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const queryParams = req.query;
    userLocation = queryParams['location'];
    res.send(userLocation);
});

app.get('/get_emwin', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var responseText = "";
    fs.readdir("../EMWIN", (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

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
        const newStr = responseText.slice(0, -1);
        res.send(newStr);
        //console.log(newStr);
    });
});


app.get('/themeaningoflifetheuniverseandeverything', (req, res) => {
    res.send('<h1>42</h1>');
});



//404 error
app.use((req, res) => {
    res.status(404).sendFile('./404.html', { root: root });
});
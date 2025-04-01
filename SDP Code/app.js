const path = require('path');
const fs = require('fs');
const express = require('express');
const root = path.join(__dirname, 'client')
const imagesPath = path.join(__dirname, '..', 'Sample Images')

//express app
const app = express();

//listen for requests
app.listen(3000);

app.use(express.static(root));

app.use('/images', express.static(imagesPath));

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: root});
});

app.get('/live_data', (req, res) => {
    res.sendFile('./live_data.html', {root: root});
});

app.get('/historic_data', (req, res) => {
    res.sendFile('./historic_data.html', {root:root});
});

app.get('/location', (req, res) => {
    res.sendFile('./location.html', {root:root});
});

app.get('/filepath', (req, res) => {
    const queryParams = req.query;
    console.log( queryParams['sector']);
    console.log( queryParams['type']);

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

app.get('/themeaningoflifetheuniverseandeverything', (req, res) => {
    res.send('<h1>42</h1>');
});



//404 error
app.use((req, res) => {
    res.status(404).sendFile('./404.html', {root:root});
});
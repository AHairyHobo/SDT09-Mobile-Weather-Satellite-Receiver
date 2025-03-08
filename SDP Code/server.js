const http = require('http');
const fs = require('fs');

function getFilesInDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return null;
        }
        return files;
      });
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader('Content-Type', 'text/plain');
    const directoryPath = '../Sample Images/Full Disk/01';
    var responseText = "Files: \n";
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }
        
        files.forEach(file => {
            responseText += "\n" + file.toString();
            console.log(file);
        });
        res.end(responseText);
      });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})
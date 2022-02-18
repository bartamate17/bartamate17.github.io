console.log('Backend fut!');

const http = require('http');
const fs = require('fs');
var url = require('url');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://URINAME:XGlrVlrLJ1fhR8ai@cluster0.2stvc.mongodb.net/CLIENTNAME?retryWrites=true&w=majority";

var mime = {
    html: "text/html",
    css: "text/css",
    txt: "text/plain",
    js: "application/javascript",
    json: "application/json",
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml"
};

function MongoDBRequest(clientName, collectionName, handler) {

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    client.connect(err => {
        const collection = client.db(clientName).collection(collectionName);
        handler(client, collection);
    })
}

http.createServer(function(request, response) {

    var parsedUrl = url.parse(request.url);

    switch (true) {

        case request.method == "GET" && parsedUrl.pathname == "/":
            response.writeHead(200, { 'Content-Type': mime["html"] + "; charset=utf-8" });
            fs.readFile(__dirname + "/index.html", function(error, data) {
                response.write(data);
                response.end();

            });
            break;

        case request.method == "POST" && parsedUrl.pathname == "/datasend":

            var templateString = "";
            var tempalteObject = {};

            request.on("data", function(chunk) {
                templateString += chunk;
            });

            request.on("end", function() {
                tempalteObject = JSON.parse(templateString);

                MongoDBRequest('CLIENTNAME', 'COLLECTIONNAME', (client, collection) => {

                    collection.insertOne(tempalteObject, function(error, dataResponse) {

                        var obj = JSON.stringify({ message: "Sikeres felülírás!" });

                        response.write(obj);
                        response.end();

                        client.close();
                    });
                });
            });
            break;



        default:
            var urlEndIndex = parsedUrl.pathname.slice(parsedUrl.pathname.indexOf(".") + 1);
            console.log(urlEndIndex);
            console.log("Ittl esz a parsedurl")
            console.log(__dirname, parsedUrl.pathname);

            response.writeHead(200, { "Content-type": mime[urlEndIndex] || "text/plain" });
            fs.readFile(path.join(__dirname, parsedUrl.pathname.slice(1)), function(error, file) {

                if (error) {
                    response.write(error + ": Hiba a betöltés során!");
                } else {
                    response.write(file);
                }
                response.end();
            });
            break;
    }
}).listen(3000);
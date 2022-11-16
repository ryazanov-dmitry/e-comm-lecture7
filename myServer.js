var http = require('http');
var fs = require('fs');

function myServerFunction(request, response) {
    if (request.url == '/freeDrones') {
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(availableDrones));
        return;
    }

    if (request.url.includes('.html') || request.url.includes('.css')) {
        serveStatic(request.url, response);
        return;
    } 

    if (request.url.includes('/orderDrone')) {
        var formParametersString = request.url.replace('/orderDrone', ''); 
        var form = new URLSearchParams(formParametersString);
        var droneName = form.get('droneName');

        var result = availableDrones.find(x => x.name == droneName);
        if (result == undefined) {
            response.end('404');
            return;
        }

        var index = availableDrones.findIndex(x => x.name == droneName);
        availableDrones.splice(index, 1);

        response.end('Drone ordered!');
        return;
    }


    response.end('Hello world!');
}

http.createServer(myServerFunction).listen(8080);


function serveStatic(url, res) {


    fs.readFile('./static/' + url, function (err, data) {
        res.write(data);
        return res.end();
    });

}



var availableDrones = [
    {
        name: 'BeeDrone',
        lat: -38.54543,
        long: 166.4324
    },
    {
        name: 'Adorable Sensors',
        lat: -43.54543,
        long: 33.4324
    },
    {
        name: 'Blue Twirls',
        lat: 15.54543,
        long: 90.4324
    },
    {
        name: 'Brigth Skies',
        lat: 45.54543,
        long: 166.4324
    }
];
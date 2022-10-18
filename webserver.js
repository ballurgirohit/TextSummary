var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)


http.listen(80); //listen to port 8080

console.log("Hello World!");

function handler (req, res) { //create server
  console.log("Server Created!");
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
	
	console.log("Writing data back");
	
    res.write(data); //write data from index.html
    return res.end();
  });
}

			
io.sockets.on('connection', function (socket) {// WebSocket Connection  
  var lightvalue = 0; //static variable for current status
  var data2;
  
  socket.on('light', function(data) { //get light switch status from client
  	
    lightvalue = data;
	console.log('Saved!');
    if (lightvalue) {
	  //lightvalue = 'led ' + lightvalue;
	  
	fs.writeFile('input.txt', lightvalue, function (err, fd) {
	  if (err) throw err;
	    //console.log('Saved!');
	});	  
		
	console.log("Python");
	
	  var spawn = require("child_process").spawn;
	  var pythonProcess = spawn('python3',["summarize.py"]);
	  
	  pythonProcess.stdout.on('data', function(data) {
		   console.log('Pipe data from python script ...');
		   data2 = data.toString();		  
		   // console.log("data2", data2);
		   // socket.emit('light', data2);
	  } )	

	  fs.readFile('output.txt', {encoding: 'utf-8'}, function(err,data2){
		if (!err) {
			console.log('received data: ' + data2);				
			socket.emit('light', data2);
			fs.unlinkSync('output.txt');
		} else {
			console.log(err);
		}
	  });	  
    }		  
  }); 
 	
});
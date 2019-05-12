//simple server listens on the provided port and responds with requested pages

// load modules
var http = require('http');
var fs = require('fs');
var url = require('url');

var mime = require('mime-types');
const ROOT = "./public";

// create http server
var server = http.createServer(handleRequest);
server.listen(2406);
console.log('Server listening on port 2406');

var widgetsData ={
	barbaloot: "A modification on the idea of a chest of drawers. A barbaloot uses patented rinker-flink technology to randomly exchange the locks and contents of each drawer at a prespecified interval. <span id='slogan'>Barbaloot, you can't lose your belongings if you don't know where they aren't.</span>",
	diffendoofer: "Ever wish your scale knew better than to tell you the truth? Well now it does! The diffendoofer&trade; is not your every day bathroom scale. Preset gravity coeficients, altered physical vibration frequencies, reassuring lies, all easily programmable with the included diffendoofr smartphone app!",
	flooberblub: "Toilet related smartphone accidents account for 1/3rd of all broken smartphones, and 3/5ths of all ear infections! Protect your smartphone with a flooberblub, the world's leading floatation-based retrieval technology. Clincal trials have proven flooberblubs will catch 85% of all falling smartphones before they hit the surface of the water. The remaining 15% will be retreived through the flooberblubs system of flushing and filtering. <span class='disclaimer'>Results may vary. Flooberblubs are not a replacement for common sense, and cannot be held liable for the consequences of your butterfingers.</span>",
	flunnel: "Cut out the middleman! With a flunnel you can pour large amounts of things into small openings that are very far away! Simply pour your large amount of things into the adjustably-sized funnel-style opening, and they will be accelerated to obscene speeds as they exit! Make rice without getting off the couch, organize your collection of antique shards of glass, relocate entire ant colonies! You can do it all with flunnel!",
	hackencracks: "<span id='slogan'>Break stuff!</span> Hackencracks are a series of microscopic swordsmen suspended in a semi-solid gel that, when activated, go to work punching, kicking, and chopping away at whichever surface you've applied them to. Now a available in viking and ninja flavours!",
	quimney: "A quimney is an autonomous quad-copter drone with the predisposition to oppose disorganization. Simply release a quimney in your home and it will go to work grabbing things with its usb3.1-powered electro-magnetic grappling hands. It's like a roomba for your things! <span id='slogan'>Organize your home with a quimney!</span> <span class='disclaimer'>Warning, quimneys do not distinguish inanimate objects from animate ones, and will in fact see animate objects as vectors of disorganization and seek to set them still. Do not operate around small children or anyone with a less than perfectly symmetrical face.</span>"
}

// handler for incoming requests
function handleRequest(req, res) {
	//process the request

	if (req.method.toLowerCase() == 'get') {
        console.log("---->>>  get");
        	var filename = ROOT+req.url;    
			var code;
			var data = "";
			
			
			var urlData = url.parse(filename,true);
			
			console.log("urlData.pathname : " + urlData.pathname);
			console.log("urlData.pathname.indexOf('.json') : " + urlData.pathname.indexOf(".json"));
			console.log("urlData.pathname.indexOf('/recipes') : " + urlData.pathname.indexOf("/recipes"));

			if (urlData.pathname.indexOf("/widgets/description")>0)
			{
				var desc = urlData.query.widgetName;
				console.log("Asking for widget " + desc);
				code = 200;
				// content header
				res.writeHead(code, {'content-type': mime.lookup(filename)||'text/html'});
				// write message and signal communication is complete
				res.end(widgetsData[desc]);
			}else if(urlData.pathname.indexOf("/recipes") > 0 && urlData.pathname.indexOf(".json") > 0){

				//this means that the client is requestig a receipe file 
				code = 200;
				data = "";
				
				if(fs.existsSync(urlData.pathname)){		
					var file = fs.readFileSync(urlData.pathname);
					data = file;
			    	code = 200;
					
				}else{
					console.log("File not found");
					code = 404;
					data = getFileContents(ROOT+"/404.html");
				}

				// content header
				res.writeHead(code, {'content-type': mime.lookup(urlData.pathname)||'text/html'});
				// write message and signal communication is complete
				res.end(data);

			}else if(urlData.pathname.indexOf("/recipes")>0){		
			    
				if(fs.existsSync(filename)){		
					var files = fs.readdirSync(filename);

					//printing filename 
					//for (var i in files){
					//	var name = filename + '/' + files[i];
					//	console.log(name);
					//}

					data = files.toString();
			    	code = 200;
					
				}else{
					console.log("File not found");
					code = 404;
					data = getFileContents(ROOT+"/404.html");
				}

				// content header
				res.writeHead(code, {'content-type': mime.lookup(filename)||'text/html'});
				// write message and signal communication is complete
				res.end(data);

			}else{
				if(fs.existsSync(filename)){		
					var stats = fs.statSync(filename);
					if(stats.isDirectory()){
						filename += "/index.html";
					}
					console.log("Getting file: "+filename);
					data = fs.readFileSync(filename);
					code = 200;
					
				}else{
					console.log("File not found");
					code = 404;
					data = getFileContents(ROOT+"/404.html");
				}
			}
    } else if (req.method.toLowerCase() == 'post') {
        console.log("---->>>  post");
    }


	// content header
	res.writeHead(code, {'content-type': mime.lookup(filename)||'text/html'});
	// write message and signal communication is complete
	res.end(data);
};

//read a file and returns its contents
function getFileContents(filename){
	
	var contents;
	
	//handle good requests
	console.log("Getting file");
	contents = fs.readFileSync(filename);
	console.log("typeof: "+typeof(contents));
	return contents;
}
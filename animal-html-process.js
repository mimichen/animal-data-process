var fs = require('fs');
fs.readFile('./animal-code.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  } 
  var results = data.match(/CallDetailBlock\((.*)\)/g);
  var csvfile = [];
  for(var index = 0; index < results.length; index = index + 1) {
 	var strToTrim = results[index];	
	strToTrim = strToTrim.replace('CallDetailBlock(', '');
	strToTrim = strToTrim.replace(')','');
	csvfile[index] = strToTrim;
  }
 	console.log(csvfile.join('\n'));
  fs.writeFile("./animal-code-result.csv", csvfile.join('\n'), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
console.log('saved successfully');
  });
});


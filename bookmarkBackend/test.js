// Changes XML to JSON
var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile('stuff.xml', 'utf-8', function(err, data) {
  parser.parseString(data, function (err, result) {
      console.log(result.GoodreadsResponse.book[0].image_url[0]);
      console.log('Done');
  });
})

var async = require('async');
var fetch = require('node-fetch');
var fs = require('fs');

var addresses = [];

function fetchAddress(index) {
  var url = 'http://animal-action.east.org.tw/modules/news/post.php?topic=' + index;
  console.log('url:', url)
  return fetch(url)
    .then(function(res) {
      return res.text();
    }).then(function(body) {
      var result = body.match(/address=(.+?)"/);
      if (result) {
        return result[1]
      }
    }).then(function(address) {
      if (address.indexOf('width') === -1) {
        addresses.push(decodeURI(address));
      }
    });
}
var start = 1;
var end = 398;
var count = 0;

async.whilst(
  function () { return count <= end; },
  function (callback) {
    count++;
    fetchAddress(count).then(() => {
      callback()
    });
  },
  function (err, n) {
    fs.writeFile("./animal-hell-place-result.txt", JSON.stringify(addresses), 'utf8', function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('saved successfully');
    });
  }
);

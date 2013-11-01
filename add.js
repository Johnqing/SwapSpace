// Generated by CoffeeScript 1.6.3
(function() {
  var DATAPATH, fs, http, info, log, path, queryParse, tmp, url, writeConfig;

  fs = require('fs');

  path = require('path');

  http = require('http');

  url = require('url');

  DATAPATH = './sites/';

  info = JSON.parse(fs.readFileSync('./data/info.json', 'utf-8'));

  tmp = "";

  fs.readFile('./tmp/input.ejs', function(err, data) {
    if (err) {
      throw err;
    }
    tmp = data;
  });

  log = function(txt) {
    console.info(txt);
  };

  queryParse = function(queryStr) {
    var queryArr, temp;
    if (!queryStr) {
      return '';
    }
    queryArr = queryStr.split('&');
    temp = {};
    queryArr.forEach(function(v, i) {
      var vArr;
      vArr = v.split('=');
      console.log(vArr[1]);
      return temp[vArr[0]] = decodeURIComponent(vArr[1]);
    });
    return temp;
  };

  writeConfig = function(data) {
    var fileName;
    data.createTime = +new Date();
    fileName = path.join(DATAPATH, (++info.totalCount) + '.json');
    return fs.writeFile(fileName, JSON.stringify(data), function(err) {
      if (err) {
        throw err;
      }
    });
  };

  http.createServer(function(req, res) {
    var pathname, reqBody;
    pathname = url.parse(req.url).pathname;
    reqBody = queryParse(url.parse(req.url).query);
    if (reqBody) {
      writeConfig(reqBody);
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(tmp);
  }).listen(1337, '127.0.0.1');

  console.log('Server running at http://127.0.0.1:1337/');

}).call(this);

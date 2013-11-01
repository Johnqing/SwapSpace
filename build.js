// Generated by CoffeeScript 1.6.3
(function() {
  var INFO, data, dataFolder, ejs, fs, parseTmp, path, tmpIndex, writeSiteInfo;

  fs = require('fs');

  path = require('path');

  ejs = require('ejs');

  dataFolder = './sites';

  tmpIndex = './tmp/index.ejs';

  INFO = './data/info.json';

  data = {
    types: {}
  };

  parseTmp = function() {
    fs.readFile(tmpIndex, 'utf8', function(err, tmp) {
      var k, keyArr, v, _ref;
      keyArr = [];
      _ref = data.types;
      for (k in _ref) {
        v = _ref[k];
        keyArr.push(k);
      }
      data.keyArr = keyArr;
      console.log(data);
      tmp = ejs.render(tmp, data);
      fs.writeFile('./index.html', tmp, 'utf-8', function(err) {
        if (err) {
          console.log(err);
          return;
        }
        return console.log('生成完毕');
      });
    });
  };

  writeSiteInfo = function(info) {
    fs.writeFileSync(INFO, JSON.stringify(info), 'utf8');
    return console.log('信息生成完成');
  };

  fs.readdir(dataFolder, function(err, files) {
    var filesLen, info;
    if (err) {
      throw err;
    }
    filesLen = files.length;
    info = JSON.parse(fs.readFileSync(INFO));
    files.forEach(function(v, i) {
      var filePath;
      filePath = path.join(dataFolder, v);
      fs.readFile(filePath, 'utf8', function(err, file) {
        var jsonData, typesArr;
        if (err) {
          throw err;
        }
        jsonData = JSON.parse(file);
        typesArr = jsonData.name.split('|');
        typesArr.forEach(function(v, i) {
          if (data.types[v] === void 0) {
            data.types[v] = [];
          }
          data.types[v].push(jsonData);
        });
        filesLen--;
        if (!filesLen) {
          if (files.length !== info.totalCount) {
            info.totalCount = files.length;
          }
          writeSiteInfo(info);
          data.info = info;
          parseTmp();
        }
      });
    });
  });

}).call(this);

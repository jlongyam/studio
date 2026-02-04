let fs = require('fs');
let path = require('path');
function cleanEmpty(folder, log) {
  
    

    var isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
      return;
    }
    var files = fs.readdirSync(folder);
    if (files.length > 0) {
      files.forEach(function(file) {
        var fullPath = path.join(folder, file);
        cleanEmpty(fullPath);
      });

      // re-evaluate files; after deleting subfolder
      // we may have parent folder empty now
      files = fs.readdirSync(folder);
    }

    if (files.length == 0) {

      if(log) console.log("removing: ", folder);
      fs.rmdirSync(folder);
      return;
    }
  }
var folder = {}

folder.clean = function(where, log) {
  if (log === undefined) log = true;
}
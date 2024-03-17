const fs = require('fs');
const path = require('path');

function updateLuaFiles(directoryPath) {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    dirents.forEach((dirent) => {
      const filePath = path.join(directoryPath, dirent.name);
      if (dirent.isDirectory()) {
        updateLuaFiles(filePath); // Recurse into subdirectories
      } else if (dirent.isFile() && path.extname(filePath) === '.lua') {
        modifyLuaFile(filePath);
      }
    });
  });
}

function modifyLuaFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Replace require with include
    let modifiedData = data.replace(/require\("lualib_bundle"\)/g, 'include("lualib_bundle.lua")');

    // Find the include statement and prepend AddCSLuaFile if it exists
    const includePattern = /local ____lualib = include\("lualib_bundle.lua"\)/;
    if (includePattern.test(modifiedData)) {
      modifiedData = modifiedData.replace(includePattern, 'AddCSLuaFile("lualib_bundle.lua")\nlocal ____lualib = include("lualib_bundle.lua")');
    }

    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) console.error('Error writing file:', err);
    });
  });
}

const luaFilesPath = path.join(__dirname, 'addons');
updateLuaFiles(luaFilesPath);

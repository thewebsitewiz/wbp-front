const path = require("path");
const fs = require("fs");

const imgPathUtils = require("./imagePath.util");

const { Image } = require("../models/image.model");
const { Tag } = require("../models/image.model");

const imageSrcDir = "/Users/dennisluken/Downloads/Will-Photos";

const maxNumberOfFilesInDirectory = 100;

const ObjectIds = {
  dive: "668023e19a8fe969c346ae2b",
  portraits: "668024399a8fe969c346ae2f",
};

main();

function main() {
  const imgFolders = fs.readdirSync(imageSrcDir);

  imgFolders.forEach((folder) => {
    const folderPath = path.join(imageSrcDir, folder);

    if (fs.lstatSync(folderPath).isDirectory()) {
      const imgFiles = fs.readdirSync(folderPath);

      imgFiles.forEach((imgFile) => {
        const imgPath = path.join(folderPath, imgFile);
        console.log(imgPath);
        const img = new Image({});
      });
    }
  });
}

function getNewDirPath() {
  const currentScriptPath = path.join(__dirname);
  const srcPath = currentScriptPath.replace(/src\/utils/, "");
  const imgPath = `${srcPath}public/images`;
  const currentImgPath = _getCurrentDirPath(imgPath);
  console.log("currentImgPath: ", currentImgPath);
  return currentImgPath;
}

function _getCurrentDirPath(imgPath) {
  const lastImgDirPath = _getLastDirectoryInDirectory(imgPath);

  const filesInLastDirectory = fs.readdirSync(lastImgDirPath).length;

  if (filesInLastDirectory < maxNumberOfFilesInDirectory) {
    return lastImgDirPath;
  }

  const lastDirectory = lastImgDirPath.split("/").pop();

  const lastDirectoryNumber = parseInt(lastDirectory);
  const nextDirectoryNumber = lastDirectoryNumber + 1;
  const nextDirectoryPath = `${imgPath}/${nextDirectoryNumber}`;

  if (!fs.existsSync(nextDirectoryPath)) {
    fs.mkdirSync(nextDirectoryPath);
  }

  return nextDirectoryPath;
}

function _getLastDirectoryInDirectory(dirPath) {
  let contents = fs.readdirSync(dirPath);
  let directories = [];

  contents.forEach((item) => {
    const testPath = `${dirPath}/${item}`;
    if (fs.statSync(testPath).isDirectory()) {
      directories.push(item);
    }
  });

  const lastDir = directories.slice(-1);
  const lastDirPath = `${dirPath}/${lastDir}`;

  return lastDirPath;
}

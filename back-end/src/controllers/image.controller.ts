const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose"); // for put and patch
const ExifReader = require("exifreader");
const multer = require("multer");

const imgPathUtils = require("../utils/imagePath.util");
// const { getColorAnalysis } = require("../utils/pixels.util");

const { Image } = require("../models/image.model");
const { Tag } = require("../models/tag.model");
const { Color } = require("../models/color.model");

const UPLOAD_FILE_SIZE_LIMIT = process.env.UPLOAD_FILE_SIZE_LIMIT;

const FILE_TYPE_MAP: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

let newFileName = "";
let imageDirPath = "";
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    imageDirPath = imgPathUtils.getNewDirPath();
    cb(null, imageDirPath);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    newFileName = path.parse(file.originalname).name;
    newFileName = newFileName.replaceAll(" ", "-");
    newFileName = `${newFileName}-${Date.now()}.${ext}`.toLowerCase();
    cb(null, newFileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new Error("Not an image! Please upload an image."), false);
  }
  if (!FILE_TYPE_MAP[file.mimetype]) {
    cb(
      new Error(
        "Not an allowed image type! Please upload a jpg or a png image."
      ),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: UPLOAD_FILE_SIZE_LIMIT },
});

module.exports.uploadMulter = upload.single("image");

const _getMetadata = async (file) => {
  return await ExifReader.load(file);
};

// const _pixelGetter = async (req, res) => {};

const _imageUpload = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  let tagIds = [];
  if (req.body.tags !== undefined || null) {
    tagIds = req.body.tags.split(",");
    console.log("tagIds: ", tagIds);
  }

  let colorIds = [];

  /*   if (req.body.colors !== undefined || null) {
    const colors = req.body.colors;
    colors.forEach(async (color) => {
      const foundColor = await Color.findById(color.tag);
      if (foundColor) {
        colorIds.push(foundColor._id);
      } else {
        let colorInfo = new Color({
          hex: color.hex,
          red: color.red,
          green: color.green,
          blue: color.blue,
        });
        colorInfo = await colorInfo.save();
        tagIds.push(colorInfo._id);
      }
    });
  } */

  const md = await _getMetadata(`${imageDirPath}/${newFileName}`);
  /*
  const pixelData = await getColorAnalysis(
    `${imageDirPath}/${newFileName}`,
    md["Image Width"]["value"],
    md["Image Height"]["value"]
  );
  console.log("pixelData: ", pixelData);
  // console.log("md: ", md);
*/

  try {
    let image = new Image({
      fileName: newFileName,
      filePath: imageDirPath,
      title: req.body.title,
      description: req.body.description,
      caption: req.body.caption,
      comments: req.body.comments,
      fileSize: file.size,
      mimeType: file.mimeType,
      height: md["Image Height"]["value"],
      width: md["Image Width"]["value"],
    });

    if (tagIds.length > 0) image.tags = tagIds;
    if (colorIds.length > 0) image.colors = colorIds;

    const imageResult = await image.save();

    if (!imageResult)
      return res.status(400).send("The image cannot be created");

    return res.send(imageResult);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for images: ${e}`,
    });
  }
};

module.exports.imageUpload = _imageUpload;

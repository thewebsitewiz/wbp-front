const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose"); // for put and patch
const ExifReader = require("exifreader");
const multer = require("multer");

const imgPathUtils = require("../utils/imagePath.util");

const { Image } = require("../models/image.model");
const { Tag } = require("../models/tag.model");
const { Color } = require("../models/color.model");

import { FILE_TYPE_MAP } from "../config/imageConstants";

let newFileName = "";
let imageDirPath = "";

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) uploadError = null;
    imageDirPath = imgPathUtils.getNewDirPath();
    cb(uploadError, imageDirPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    newFileName = `${fileName}-${Date.now()}.${extension}`;
    cb(null, newFileName);
  },
});

const uploadOptions = multer({
  storage: storage,
});

module.exports.uploadMulter = uploadOptions.single("image");
 */
const _getMetadata = async (file) => {
  return await ExifReader.load(file);
};

const _imageUpload = async (req, res) => {
  const file = req.file;
  console.log("image file: ", file);

  if (!file) return res.status(400).send("No image in the request");

  let tagIds = [];
  if (req.body.tags !== undefined || null) {
    tagIds = req.body.tags.split(",");
    console.log("tagIds: ", tagIds);
  }

  const md = await _getMetadata(`${imageDirPath}/${newFileName}`);

  const dbImgDirPath = imageDirPath.split("public/images")[1];

  try {
    let image = new Image({
      src: `${dbImgDirPath}/${newFileName}`,
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

    const imageResult = await image.save();
    console.log("imageResult: ", imageResult);

    if (!imageResult)
      return res.status(400).send("The image data is not inserted");

    return res.send(imageResult);
  } catch (e) {
    console.log("error in catch for image data insert: ", e);
    console.log(imageDirPath, dbImgDirPath);
    return res.status(500).json({
      success: false,
      message: `error in catch for image data insert: ${e}`,
    });
  }
};

module.exports.imageUpload = _imageUpload;

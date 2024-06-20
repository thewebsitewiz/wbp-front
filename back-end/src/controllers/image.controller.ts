const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose"); // for put and patch
const multer = require("multer");

const imgPathUtils = require("@utils/imagePath.utils");

const { Images } = require("../models/image.model");
const { Tags } = require("../models/tag.model");
const { Colors } = require("../models/color.model");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }

    const dirPath = imgPathUtils.getNewDirPath();

    cb(uploadError, `${dirPath}`);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({
  storage: storage,
});

const _imageUpload = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const dirPath = imgPathUtils.getNewDirPath();
  const fileName = file.filename;

  let tagIds = null;
  const passedTags = req.body.tags;
  if (passedTags.length > 0) {
    passedTags.forEach(async (tag) => {
      const foundTag = await Tags.findById(tag.tag);
      if (foundTag) {
        tagIds.push(foundTag._id);
      } else {
        let tagPayload = new Tags({
          tag: tag.tag,
          description: tag.description,
        });
        const tagResult = await tagPayload.save();
        tagIds.push(tagResult._id);
      }
    });
  }

  let colorIds = null;
  const colors = req.body.tags;
  if (colors.length > 0) {
    colors.forEach(async (tag) => {
      const foundColor = await Colors.findById(tag.tag);
      if (foundColor) {
        colorIds.push(foundColor._id);
      } else {
        let colorInfo = new Colors({
          tag: tag.tag,
          description: tag.description,
        });
        colorInfo = await colorInfo.save();
        tagIds.push(colorInfo._id);
      }
    });
  }
  try {
    let image = new Images({
      fileName: fileName,
      filePath: dirPath,
      title: req.body.title,
      description: req.body.description,
      caption: req.body.caption,
      comments: req.body.comments,
      fileSize: req.body.fileSize,
      fileType: req.body.fileType,
      mimeType: req.body.mimeType,
      dateTaken: req.body.dateTaken,
      height: req.body.height,
      width: req.body.width,
      resolution: req.body.resolution,
      colorDepth: req.body.colorDepth,
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

/* 
function saveNotification1(data) {
    var notification = new Notification(data);
    notification.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}

function saveNotification2(data) {
    Notification.create(data, function (err, small) {
    if (err) return handleError(err);
    // saved!
    })
} */
module.exports.imageUpload = _imageUpload;

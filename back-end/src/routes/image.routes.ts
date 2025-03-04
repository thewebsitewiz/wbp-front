const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();

const { uploadPhoto } = require("../middleware/uploadImages");
const {
  imageUpload,
  getAllImages,
  updateImage,
} = require("../controllers/image.controller");

router.post(`/upload-image`, uploadPhoto, async (req, res, next) => {
  try {
    await imageUpload(req, res, next);
  } catch (error) {
    console.log("imageUpload route error: ", error);
  }
});

router.get(`/get-all-images`, async (req, res, next) => {
  try {
    await getAllImages(req, res, next);
  } catch (error) {
    console.log("getAllImages route error: ", error);
  }
});

router.get(`/get-image`, async (req, res) => {});

router.get(`/delete-images`, async (req, res) => {});

router.patch(`/update-image/:id`, async (req, res) => {
  try {
    await updateImage(req, res);
  } catch (error) {
    console.log("updateImage route error: ", error);
  }
});

module.exports = router;

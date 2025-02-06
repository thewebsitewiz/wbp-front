const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();

const { uploadPhoto } = require("../middleware/uploadImages");
const { imageUpload } = require("../controllers/image.controller");

router.post(`/upload-image`, uploadPhoto, async (req, res, next) => {
  try {
    await imageUpload(req, res, next);
  } catch (error) {
    console.log("imageUpload route error: ", error);
  }
});

router.get(`/get-images`, async (req, res) => {});

router.get(`/get-image`, async (req, res) => {});

router.get(`/delete-images`, async (req, res) => {});

module.exports = router;

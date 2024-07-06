const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();

const {
  imageUpload,
  uploadMulter,
} = require("../controllers/image.controller");

router.post(`/upload-image`, uploadMulter, async (req, res, next) => {
  await imageUpload(req, res, next);
});

router.post(`/upload-file`, uploadMulter, async (req, res, next) => {
  console.log("file uploaded: ", req.file);
});


router.get(`/get-images`, async (req, res) => {});

router.get(`/get-image`, async (req, res) => {});

router.get(`/delete-images`, async (req, res) => {});

module.exports = router;

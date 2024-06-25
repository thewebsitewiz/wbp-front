// // @ts-ignore
const express = require("express");
const router = express.Router();

const { imageUpload } = require("../controllers/image.controller");

router.post(`/upload-image`, async (req, res) => {
  try {
    const data = await imageUpload(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for IMAGES UPLOAD: ${e}`,
    });
  }
});

router.post(`/upload-file`, async (req, res) => {
  try {
    const data = await imageUpload(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for IMAGES UPLOAD: ${e}`,
    });
  }
});

router.get(`/get-images`, async (req, res) => {});

router.get(`/get-image`, async (req, res) => {});

router.get(`/delete-images`, async (req, res) => {});

module.exports = router;

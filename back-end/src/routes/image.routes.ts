// // @ts-ignore
const express = require("express");
const router = express.Router();

const { imageUpload } = require("../controllers/image.controller");

router.post(`/upload`, async (req, res) => {
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

router.get(`/list`, async (req, res) => {});

module.exports = router;

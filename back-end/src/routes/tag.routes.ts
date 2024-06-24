// // @ts-ignore
const express = require("express");
const router = express.Router();

const { getTags } = require("../controllers/tag.controller");

router.get(`/`, async (req, res) => {
  try {
    const data = await getTags(req, res);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for GET TAGS: ${e}`,
    });
  }
});

module.exports = router;

// // @ts-ignore
const express = require("express");
const router = express.Router();

const Tag = require("../controllers/tag.controller");
const { Tags } = require("../models/tag.model");

router.get(`/get-tags`, Tag.getTags);

router.post(`/add-tag`, (req, res) => {
  console.log(req.body);
  Tag.addTag(req, res);
});

module.exports = router;

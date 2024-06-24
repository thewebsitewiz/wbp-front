const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { Tags } = require("../models/tag.model");

const _getTags = async (req, res) => {};

module.exports.getTags = _getTags;

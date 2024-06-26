const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { Tags } = require("../models/tag.model");

const _getTags = async (req, res) => {
  try {
    Tags.find().then((tags) => {
      console.log("tags: ", tags);
      return tags;
    });
  } catch (e) {
    console.error(`Error in catch for GET TAGS: ${e}`);
    throw new Error(e);
  }
};

module.exports.getTags = _getTags;

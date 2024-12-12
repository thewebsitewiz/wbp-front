const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

import { ITag, ITags, TagsByType } from "../interfaces/tag.interface";

const { Tag } = require("../models/tag.model");
const { Image } = require("../models/image.model");
const { Vendor } = require("../models/vendor.model");

const getTagsFromCollection = [
  {
    $lookup: {
      from: "tags",
      localField: "tags",
      foreignField: "_id",
      as: "tags_docs",
    },
  },
  {
    $unwind: "$tags_docs",
  },
  {
    $replaceRoot: {
      newRoot: "$tags_docs",
    },
  },
];
module.exports.addTag = async (req, res) => {
  console.log("controller: ", req.body);

  try {
    await Tag.find({ tag: req.body.tag }).then((tags) => {
      if (tags.length > 0) {
        res.status(304).send({
          status: 304,
          tag: req.body.tag,
          success: false,
          msg: "tag exists",
          err: false,
        });
      } else {
        const newTag = new Tag({
          tag: req.body.tag,
        });

        newTag.save().then((result) => {
          if (result._id) {
            res.status(201).send({
              status: 201,
              tag: req.body.tag,
              success: true,
              msg: "tag added",
              err: false,
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      tag: req.body.tag,
      success: false,
      msg: `error in catch for addTags: ${e}`,
      err: true,
    });
  }
};

module.exports.getAllTags = async (req, res) => {
  try {
    await Tag.find()
      .sort({ count: -1, tag: 1 })
      .then((tags: ITags) => {
        return res.status(200).send(tags);
      });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getTags: ${e}`,
    });
  }
};

module.exports.getTagsByType = async (req, res) => {
  const type = decodeURI(req.params.type);
  const tagsByType: TagsByType = {};
  try {
    if (type === "image") {
      await Image.find(getTagsFromCollection).then((tags: ITags) => {
        tags.forEach((tag: ITag) => {
          _addToTagsByType(tagsByType, tag);
        });
      });
    } else if (type === "vendor") {
      await Vendor.find(getTagsFromCollection).then((tags: ITags) => {
        tags.forEach((tag: ITag) => {
          _addToTagsByType(tagsByType, tag);
        });
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getTagsByType (${type}): ${e}`,
    });
  }

  if (Object.keys(tagsByType).length > 0) {
    return res.status(200).send(tagsByType);
  } else {
    return res.status(404).send({
      status: 404,
      success: false,
      msg: "no tags found",
      err: false,
    });
  }
};

function _addToTagsByType(tagsByType: TagsByType, tag: ITag) {
  if (tagsByType[tag.tag] !== undefined) {
    let count = tagsByType[tag.tag].count;
    tagsByType[tag.tag] = { tag: tag, count: count + 1 };
  } else {
    tagsByType[tag.tag] = { tag: tag, count: 1 };
  }
}

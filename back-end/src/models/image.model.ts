import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const tagName = mongoose.Schema({
  name: String,
});

const imagesSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    caption: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
    fileSize: {
      type: Decimal128,
      required: false,
    },
    fileType: {
      type: String,
      required: false,
    },
    mimeType: {
      type: String,
      required: false,
    },
    dateTaken: {
      type: Date,
      required: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
        required: false,
      },
    ],
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colors",
        required: false,
      },
    ],
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    resolution: {
      type: Number,
      required: true,
    },
    colorDepth: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

imagesSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

imagesSchema.set("toJSON", {
  virtuals: true,
});

exports.Images = mongoose.model("Images", imagesSchema);

import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const moonName = mongoose.Schema({
  name: String,
});

const tagSchema = mongoose.Schema(
  {
    tag: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

tagSchema.set("toJSON", {
  virtuals: true,
});

exports.Tags = mongoose.model("Tags", tagSchema);

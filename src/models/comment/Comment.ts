import { Schema, model } from "mongoose";

export interface IComment {
  text: string;
  author: string;
  collection: string;
  _id: string;
}

export interface IComment {
  text: string;
  author: string;
  collection: string;
  _id: string;
}

const Comment = new Schema({
  text: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
});

export default model("Comment", Comment);

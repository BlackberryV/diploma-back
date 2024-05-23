import { Schema, model } from "mongoose";

const Field = new Schema({
  title: { type: String, required: true },
});

export default model("Field", Field);

import { Schema, model } from "mongoose";

const User = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, required: true }],
});

export default model("User", User);

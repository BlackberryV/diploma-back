import { Schema, model } from "mongoose";
import { ROLE } from "../../types/auth";

const Role = new Schema({
  value: { type: String, unique: true, default: ROLE.USER },
});

export default model("Role", Role);

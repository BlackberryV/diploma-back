import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const SECRET_KEY = "secret_key";

export const PORT = process.env.PORT || 3001;

export const MONGO_CONNECTION_LINK =
  "mongodb+srv://username:FsIxMoEJO5OyqXXf@diploma.4zom3os.mongodb.net/?retryWrites=true&w=majority&appName=Diploma";

export const SALT = 7;

export const generateAccessToken = (id: Types.ObjectId, roles: string[]) => {
  const payload = { id, roles };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

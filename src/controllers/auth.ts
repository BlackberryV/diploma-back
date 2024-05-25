import { Request, Response } from "express";

import User from "../models/auth/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { ROLE } from "../types/auth";
import { SALT, generateAccessToken } from "../helpers/common";

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ message: "Registration error", errors });
      }

      const { name, surname, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, SALT);

      const user = new User({
        name,
        surname,
        email,
        password: hashPassword,
        roles: ["USER"],
      });

      await user.save();

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate)
        return res.status(400).json({ message: "User not found" });

      const validPassword = bcrypt.compareSync(password, candidate.password);

      if (!validPassword)
        return res.status(400).json({ message: "Password is not valid" });
      const token = generateAccessToken(candidate._id, candidate.roles);

      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    try {
      const { email, newRole } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { email },
        { roles: [newRole] },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const users = await User.findById(id);
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
}

export const authController = new AuthController();

import { Router } from "express";
import { authController } from "../controllers/auth";
import { check } from "express-validator";
import { authMiddleware, roleMiddleware } from "../middlewares/auth";

export const authRouter = Router();

authRouter.post(
  "/registration",
  [
    check("name", "Name is required").notEmpty(),
    check("surname", "Surname is required").notEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password must be longer than 6 symbols").isLength({
      min: 6,
    }),
  ],
  authController.registration
);
authRouter.post("/login", authController.login);
authRouter.get(
  "/users",
  roleMiddleware(["USER", "ADMIN"]),
  authController.getUsers
);
authRouter.get("/users/:id", authController.getUserById);

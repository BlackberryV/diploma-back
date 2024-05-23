import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../helpers/common";
import { IRole } from "../types/auth";

interface AuthenticatedRequest extends Request {
  user?: { roles: string[]; id: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") next();

  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing Authorization Header" });
    }

    const [authType, token] = authHeader.split(" ");
    if (authType !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Unauthorized: Invalid Authorization Header Format",
      });
    }

    const decodedData = jwt.verify(token, SECRET_KEY) as {
      roles: string[];
      id: string;
    };
    req.user = decodedData;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: token is not valid" });
  }
};

export const roleMiddleware =
  (roles: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") next();

    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Missing Authorization Header" });
      }

      const [authType, token] = authHeader.split(" ");
      if (authType !== "Bearer" || !token) {
        return res.status(401).json({
          message: "Unauthorized: Invalid Authorization Header Format",
        });
      }

      const { roles: decodedRoles } = jwt.verify(token, SECRET_KEY) as {
        roles: string[];
        id: string;
      };

      let hasRole = false;

      decodedRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole)
        return res.status(401).json({
          message: "Unauthorized: user do not have access rights",
        });

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: token is not valid" });
    }
  };

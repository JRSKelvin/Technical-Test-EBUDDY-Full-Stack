import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";
/*
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your_secret_key";
*/

export interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }
  try {
    /* Migrate To Using Firebase Authentication
    const decoded = jwt.verify(token, secretKey);
    */
    const decoded = getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
};

export default authMiddleware;

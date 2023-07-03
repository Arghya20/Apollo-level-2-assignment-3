import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export const login = (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: info ? info.message : "Authentication failed",
      });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

    return res.json({ success: true, token });
  })(req, res);
};

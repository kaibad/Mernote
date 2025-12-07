import express from "express";
import { body } from "express-validator";

import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRequest } from "../middleware/ValidateMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be minimum of 6 characters"),
  ],
  validateRequest,
  registerUser
);
router.post(
  "/login",
  [
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password").notEmpty().withMessage("Password Required"),
    ],
    validateRequest,
  ],
  validateRequest,
  loginUser
);

export default router;

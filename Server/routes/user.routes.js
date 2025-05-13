import express from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    body("role")
      .isIn(["user", "admin"])
      .withMessage("Role must be either user or admin")
  ],
  UserController.registerUser
);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
  ],
  UserController.loginUser
);
router.post("/logout", authMiddleware, UserController.logoutUser);

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

export default router;

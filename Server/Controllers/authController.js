const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSchema = require("../Models/Auth");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await authSchema.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await authSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.json({ success: false, message: "Error Registering User", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Login Request:", req.body);

    const user = await authSchema.findOne({ email, role });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password is Incorrect" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "User Logged In Successfully",
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

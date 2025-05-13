import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackListToken.model.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const blackListedToken = await BlackListToken.findOne({ token });
  if (blackListedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;

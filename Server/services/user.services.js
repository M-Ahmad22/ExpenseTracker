import User from "../models/user.model.js";

const createUser = async (name, email, password, role) => {
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }
  const user = await User.create({ name, email, password, role });
  return user;
};

export const UserServices = {
  createUser,
};

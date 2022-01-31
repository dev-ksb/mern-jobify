import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError("Please provide all values");

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) throw new BadRequestError("Email is already exist");

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide all values");

  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new UnAuthenticatedError("Invalid Credentials");

  const isPassword = await user.comparePassword(password);

  if (!isPassword) throw new UnAuthenticatedError("Password does not match");

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
    token,
  });
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };

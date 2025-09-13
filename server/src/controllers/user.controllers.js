import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.models.js";

const userControllers = {
  register: asyncHandler(async (req, res) => {
    const { name, email, password, department, role } = req.body;

    if (!name || !email || !password ) {
      throw new ApiError(400, "Name, email and password are required");
    }
    const isExisting = await User.findOne({ email });
    // console.log(isExisting);
    if (isExisting) {
      throw new ApiError(409, "User already exists");
    }

    const user = new User({ name, email, password, department, role });
    await user.save();

    return res
      .status(201)
      .json(new ApiResponse(201, { user }, "User registered successfully"));
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      throw new ApiError(401, "Invalid email or password");
    }
    const options = {
      httpOnly: true,
      secure: true, // for https
    };

    const token = user.generateAccessToken();
    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(200, { user, token }, "User logged in successfully")
      );
  }),
  logOut: asyncHandler(async (req, res) => {
    const option = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("token", option)
      .json(new ApiResponse(200, "User Logged Out SuccesFully"));
  }),
  getProfile: asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const user = await User.aggregate([
      { $match: { _id: userId } },
      {
        $lookup: {
          from: "books",
          localField: "uploadHistory",
          foreignField: "_id",
          as: "uploadHistory",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          department: 1,
          createdAt: 1,
          updatedAt: 1,
          uploadHistory: 1,
        },
      },
    ]);
    if (!user || user.length === 0) {
      throw new ApiError(404, "User not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: user[0] },
          "User profile fetched successfully"
        )
      );
  }),
  updateProfile: asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { name, password, department } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (name) user.name = name;
    if (password) user.password = password;
    if (department) user.department = department;
    await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse(200, { user }, "User profile updated successfully")
      );
  }),


};
export default userControllers;

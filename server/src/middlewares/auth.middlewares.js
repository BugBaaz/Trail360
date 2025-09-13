import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const verifyJWT = (role) =>
  asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
      throw new ApiError(402, "Token not provided");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Worng token");
    }
    if (decodedToken.role !== role) {
      throw new ApiError(403, "Access denied");
    }
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Token is expired");
    }
    req.user = user;

    next();
  });

  export {verifyJWT}

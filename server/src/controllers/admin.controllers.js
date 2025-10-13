import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.models.js";
import { get } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const adminControllers = {
  addBook : asyncHandler(async (req, res) => {
    const { title, author, publishedDate, genre, summary } = req.body;
    const thumbnail = req.files?.thumbnail?.[0]?.path || null;
    const book = req.files?.book?.[0]?.path || null;

    if (!title || !author || !publishedDate || !genre || !summary || !thumbnail || !book) {
      throw new ApiError(400, "All fields are required");
    }

    const bookUrl = await uploadOnCloudinary(book)
    const thumbnailUrl = await uploadOnCloudinary(thumbnail)
    if (!bookUrl || !thumbnailUrl) {
      throw new ApiError(500, "Failed to upload files");
    }
    const newBook = new Book({
      title,
      author,
      publishedDate,
      genre,
      summary,
      thumbnail: thumbnailUrl,
      book: bookUrl,
    });
    await newBook.save();

    return res
      .status(201)
      .json(new ApiResponse(201, newBook, "Book added successfully"));
  }),
  getAdminDashboard: asyncHandler(async (req, res) => {
    // frontend se query params la lo (default: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [totalUsers, users, books] = await Promise.all([
      User.estimatedDocumentCount(),
      User.find({}, "name email role department createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Book.find({}, "title author department createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const adminData = {
      totalUsers,
      users,
      books,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          adminData,
          "Admin dashboard data fetched successfully"
        )
      );
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  }),
  deleteBook: asyncHandler(async (req, res) => {
    const bookId = req.params.bookId;
    if (!bookId) {
      throw new ApiError(400, "Book ID is required");
    }
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Book deleted successfully"));
  }),
  getAllUsers: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await User.find({}, "name email role department createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res
      .status(200)
      .json(new ApiResponse(200, { users }, "All users fetched successfully"));
  }),
  getAllBooks: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const books = await Book.find({}, "title author department createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "name email");
    return res
      .status(200)
      .json(new ApiResponse(200, { books }, "All books fetched successfully"));
  }),
  getStats: asyncHandler(async (req, res) => {
    const [totalUsers, totalBooks, booksPerGenre] = await Promise.all([
      User.estimatedDocumentCount(),
      Book.estimatedDocumentCount(),
      Book.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }]),
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalUsers,
          totalBooks,
          booksPerGenre,
        },
        "Stats fetched successfully"
      )
    );
  }),
  blockUser: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.isBlocked = !user.isBlocked; // toggle block/unblock
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { userId: user._id, isBlocked: user.isBlocked },
          `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`
        )
      );
  }),
  getBlockedUsers: asyncHandler(async (req, res) => {
    const blockedUsers = await User.find(
      { isBlocked: true },
      "name email role department createdAt"
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { blockedUsers },
          "Blocked users fetched successfully"
        )
      );
  }),
  updateBook: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, thumbnailUrl, bookUrl } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      throw new ApiError(404, "Book not found");
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    //   if (publishedDate) book.publishedDate = publishedDate;
    if (thumbnailUrl) book.thumbnailUrl = thumbnailUrl;
    if (bookUrl) book.bookUrl = bookUrl;

    await book.save();

    return res
      .status(200)
      .json(new ApiResponse(200, book, "Book updated successfully"));
  }),
  getAnalytics: asyncHandler(async (req, res) => {
    const [userGrowth, bookGrowth, booksPerGenre, topUploaders] =
      await Promise.all([
        // Users per month
        User.aggregate([
          {
            $group: {
              _id: { $month: "$createdAt" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),

        // Books per month
        Book.aggregate([
          {
            $group: {
              _id: { $month: "$createdAt" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),

        // Books per genre
        Book.aggregate([
          { $group: { _id: "$genre", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),

        // Top uploaders
        Book.aggregate([
          { $group: { _id: "$uploadedBy", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "uploader",
            },
          },
          { $unwind: "$uploader" },
          {
            $project: {
              count: 1,
              "uploader.name": 1,
              "uploader.email": 1,
            },
          },
        ]),
      ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          userGrowth,
          bookGrowth,
          booksPerGenre,
          topUploaders,
        },
        "Analytics fetched successfully"
      )
    );
  }),
};

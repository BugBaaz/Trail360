import { Book } from "../models/book.models";

export const booksControllers = {
    uploadBook: asyncHandler(async (req, res) => {
        const { title, author, genre } = req.body;
        const  publishedDate  = Date.now();
        const userId = req.user?._id;
        const { thumbnailUrl, bookUrl } = req.body;
        if (!title || !author || !genre || !thumbnailUrl || !bookUrl) {
            throw new ApiError(400, "All fields are required");
        }
        const book = await Book.create({
            title,
            author,
            publishedDate,
            genre,
            thumbnailUrl,
            bookUrl,
            uploadedBy: userId,
        });
        return res
            .status(201)
            .json(new ApiResponse(201, { book }, "Book uploaded successfully"));
    }),
    getAllBooks: asyncHandler(async (req, res) => {
        const books = await Book.find().populate("uploadedBy", "name email");
        return res
            .status(200)
            .json(new ApiResponse(200, { books }, "Books fetched successfully"));
    }),
    getBookById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const book = await Book.findById(id).populate("uploadedBy", "name email");
        if (!book) {
            throw new ApiError(404, "Book not found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, { book }, "Book fetched successfully"));
    }),
    
}
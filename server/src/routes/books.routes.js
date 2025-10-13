import express from "express";
import {booksControllers} from "../controllers/books.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminControllers } from "../controllers/admin.controllers.js";

const router = express.Router();
// router.route("/add").post(verifyJWT("admin"), adminControllers.uplo);
router.route("/all").get(booksControllers.getAllBooks);
router.route("/:id").get(verifyJWT("student"), booksControllers.getBookById);

export default router;
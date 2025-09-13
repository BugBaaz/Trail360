import express from "express";
import bookControllers from "../controllers/book.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();
router.route("/add").post(verifyJWT("admin"), bookControllers.addBook);
router.route("/all").get(bookControllers.getAllBooks);
router.route("/download/:id").get(verifyJWT("student"), bookControllers.downloadBook);

export default router;
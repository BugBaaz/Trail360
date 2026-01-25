import userControllers from "../controllers/user.controllers.js";
import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminControllers } from "../controllers/admin.controllers.js";

const router = express.Router();

router.route("/register").post(userControllers.register);
router.route("/login").post(userControllers.login);
router.route("/logout").post(userControllers.logOut)
router.route("/profile").get(verifyJWT("student") ,userControllers.getProfile);
router.route("/profile/update").put(verifyJWT("student"),userControllers.updateProfile);


router.route("/admin/dashboard").get(verifyJWT("admin"),adminControllers.getAdminDashboard);
router.route("/admin/delete/:id").delete(verifyJWT("admin"),adminControllers.deleteUser);
router.route("/admin/book/:id").delete(verifyJWT("admin"),adminControllers.deleteBook);
router.route("/admin/stats").get(verifyJWT("admin"),adminControllers.getStats);
router.route("/admin/allusers").get(verifyJWT("admin"),adminControllers.getAllUsers);
router.route("/admin/allbooks").get(verifyJWT("admin"),adminControllers.getAllBooks);
router.route("/admin/block/:id").put(verifyJWT("admin"),adminControllers.blockUser);
router.route("/admin/blockedusers").get(verifyJWT("admin"),adminControllers.getBlockedUsers);
router.route("/admin/book/update/:id").put(verifyJWT("admin"),adminControllers.updateBook);
router.route("/admin/analyze").get(verifyJWT("admin"),adminControllers.getAnalytics);
export default router;
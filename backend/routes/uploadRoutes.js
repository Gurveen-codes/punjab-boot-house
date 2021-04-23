import path from "path";
import express from "express";
import multer from "multer";
import { isAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (!extname && !mimetype) {
		return cb(new Error("Only image upload is allowed!"), false);
	}
	cb(null, true);
}
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.route("/").post(upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;

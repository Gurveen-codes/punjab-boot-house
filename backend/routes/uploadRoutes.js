import path from "path";
import express from "express";
import multer from "multer";
import { isAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(path.extname(file.extname).toLowerCase());
	const mimeType = fileTypes.test(file.mimeType);

	if (extName && mimeType) {
		return cb(null, true);
	} else {
		cb("Images Only");
	}
}

const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post("/", protectRoute, isAdmin, upload.single("image"), (req, res) => {
	res.send(`/${req.file.path}`);
});

export default router;

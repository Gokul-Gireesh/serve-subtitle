import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const uploadDir = path.join(__dirname, "uploads");

fs.mkdir(uploadDir, { recursive: true }, () => {});

const allowedExtensions = [".srt", ".vtt"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadDir);
    });
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error("Only .srt and .vtt subtitle files are allowed!"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter
}).single("subtitle");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ message: err.message });

    if (!req.file) return res.json({ message: "No file uploaded!" });

    res.json({ message: "Subtitle uploaded successfully!" });
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
import multer from "multer";

//Configure multer to share files in memory as Buffer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePreffix + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

import multer from "multer";

//Configure multer to share files in memory as Buffer
const storage = multer.memoryStorage()

const upload = multer({ storage });

export default upload;

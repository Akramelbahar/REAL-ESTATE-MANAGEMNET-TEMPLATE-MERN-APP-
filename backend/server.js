import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from './routes/admin.routes.js';
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"; 
import adsRoutes from "./routes/ads.routest.js"; 
import advertismentRoutes from "./routes/advertisment.routes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.resolve();
console.log
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5000',
    credentials: true, 
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } 
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/advertisment", advertismentRoutes);
app.use("/api/user/list", advertismentRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/advertisment", adsRoutes);
app.use("/api/listing", adsRoutes);


app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    console.log(`File uploaded successfully: ${fileUrl}`);
    res.json({ message: 'File uploaded successfully!', url: fileUrl });
});

app.use('/uploads', express.static(('uploads')));
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log("Listening on port", PORT);
});

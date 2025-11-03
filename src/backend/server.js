import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import User from "./Modules/User.js";
import Quote from "./Modules/Quotes.js";
import admin from "./firebaseAdmin.js"; // ✅ Firebase Admin SDK

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/* -------------------------------------------------------------------------- */
/* 🧱 MIDDLEWARE SETUP                                                        */
/* -------------------------------------------------------------------------- */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------------------------------------------------------------- */
/* 📁 MULTER SETUP (File Uploads)                                             */
/* -------------------------------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/* -------------------------------------------------------------------------- */
/* 🌐 DATABASE CONNECTION                                                     */
/* -------------------------------------------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err.message));

/* -------------------------------------------------------------------------- */
/* 🔒 VERIFY FIREBASE TOKEN MIDDLEWARE                                        */
/* -------------------------------------------------------------------------- */
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = decodedToken; // contains uid, email, etc.
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

/* -------------------------------------------------------------------------- */
/* 📜 QUOTES ENDPOINTS                                                        */
/* -------------------------------------------------------------------------- */
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/api/quotes", upload.single("image"), async (req, res) => {
  try {
    const { text, author, category, tags, postedBy, likes, likedBy, savedBy } = req.body;
    const quote = new Quote({
      text,
      author,
      category,
      tags: tags ? JSON.parse(tags) : [],
      image: req.file ? `/uploads/${req.file.filename}` : "",
      postedBy,
      likes: likes || 0,
      likedBy: likedBy ? JSON.parse(likedBy) : [],
      savedBy: savedBy ? JSON.parse(savedBy) : [],
    });
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* 👤 USER ROUTES                                                             */
/* -------------------------------------------------------------------------- */

// ✅ Get user by Firebase UID
app.get("/api/users/by-uid/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// ✅ Signup user (called right after Firebase signup)
app.post("/api/users/auth/signup", async (req, res) => {
  try {
    const { firebaseUid, email, name, profilePic, phoneNumber, location, website, bio } = req.body;
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({
        firebaseUid,
        email,
        name,
        profilePic,
        phoneNumber,
        location,
        website,
        bio,
      });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// ✅ Get currently logged-in user's info
app.get("/api/users/me", verifyFirebaseToken, async (req, res) => {
  try {
    const firebaseUid = req.firebaseUser.uid; // 🔥 use .uid here (Firebase Admin gives `uid`)
    let user = await User.findOne({ firebaseUid });

    // Auto-create user if missing
    if (!user) {
      const { email, name, picture } = req.firebaseUser;
      user = new User({
        firebaseUid,
        email: email || "",
        name: name || "New User",
        profilePic: picture || "",
      });
      await user.save();
      console.log(`✅ Auto-created user for ${firebaseUid}`);
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ msg: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* ✏️ UPDATE USER PROFILE (with image upload)                                 */
/* -------------------------------------------------------------------------- */
app.put("/api/users/update", verifyFirebaseToken, upload.single("profilePic"), async (req, res) => {
  try {
    console.log("✅ Update request received");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const firebaseUid = req.firebaseUser.uid;
    const updates = req.body;

    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // 🧹 Delete old profile pic if new one uploaded (and not default)
    if (req.file && user.profilePic && !user.profilePic.includes("default.jpg")) {
      const oldPath = path.resolve(`.${user.profilePic}`);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("🧹 Deleted old profile picture:", oldPath);
      }
    }

    // 🖼️ Add new image path
    if (req.file) updates.profilePic = `/uploads/${req.file.filename}`;

    // 📝 Apply updates and save
    Object.assign(user, updates);
    await user.save();

    console.log("✅ User updated successfully:", user.email);
    res.json(user);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ msg: error.message || "Failed to update user profile" });
  }
});

/* -------------------------------------------------------------------------- */
/* 🚀 SERVER STARTUP                                                          */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

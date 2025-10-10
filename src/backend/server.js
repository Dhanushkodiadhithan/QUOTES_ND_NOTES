import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Quote from './Modules/Quotes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB error:', err.message));

// Routes

app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post('/api/quotes', upload.single('image'), async (req, res) => {
  try {
    const {
      text,
      author,
      category,
      tags,
      postedBy,
      likes,
      likedBy,
      shares,
      sharedBy,
      savedBy,
      isPublic,
    } = req.body;

    const tagsArray = tags ? JSON.parse(tags) : [];
    const likedByArray = likedBy ? JSON.parse(likedBy) : [];
    const sharedByArray = sharedBy ? JSON.parse(sharedBy) : [];
    const savedByArray = savedBy ? JSON.parse(savedBy) : [];

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const quote = new Quote({
      text,
      author,
      category,
      tags: tagsArray,
      image,
      postedBy,
      likes: likes || 0,
      likedBy: likedByArray,
      shares: shares || 0,
      sharedBy: sharedByArray,
      savedBy: savedByArray,
      isPublic: isPublic !== undefined ? (isPublic === 'true' || isPublic === true) : true,
    });

    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) return res.status(404).json({ msg: 'Quote not found' });
    res.json({ msg: 'Quote deleted', deletedQuote });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.put('/api/quotes/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    if (updateData.tags) updateData.tags = JSON.parse(updateData.tags);
    if (updateData.likedBy) updateData.likedBy = JSON.parse(updateData.likedBy);
    if (updateData.sharedBy) updateData.sharedBy = JSON.parse(updateData.sharedBy);
    if (updateData.savedBy) updateData.savedBy = JSON.parse(updateData.savedBy);
    if (updateData.isPublic !== undefined) {
       updateData.isPublic = (updateData.isPublic === 'true' || updateData.isPublic === true);
    }

    const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedQuote) return res.status(404).json({ msg: 'Quote not found' });
    res.json(updatedQuote);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

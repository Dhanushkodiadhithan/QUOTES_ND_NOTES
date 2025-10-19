import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  text:        { type: String, required: true },
  author:      { type: String, required: true },
  category:    { type: String, required: true },
  tags:        { type: [String], default: [] },
  image:       { type: String, default: "" },
  postedBy:    { type: String },
  likes:       { type: Number, default: 0 },
  likedBy:     { type: [String], default: [] },
  savedBy:     { type: [String], default: [] },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
});

// ES module export default!
export default mongoose.model('Quote', QuoteSchema);

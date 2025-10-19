import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },      // Firebase UID
  email:       { type: String, required: true, unique: true },
  name:        { type: String, default: "" },                        // Full Name
  profilePic:  { type: String, default: "" },                        // Profile Picture
  bio:         { type: String, default: "Hey there! I’m using Quotes & Notes." },
  phoneNumber: { type: String, default: "" },
  location:    { type: String, default: "" },
  website:     { type: String, default: "" },
  collections: [{ type: String, default: [] }],                      // or could be array of Quote ObjectIds if you want
  savedQuotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quote" }],
  likedQuotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quote" }],
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);

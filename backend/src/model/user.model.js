import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    password: { type: String, required: true, minlength: 6 },

    createdAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

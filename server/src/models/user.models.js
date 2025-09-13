import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    department: {
      type: String,
      enum: ["cse", "ece", "mech", "civil", "chem", "bio"],
      default: "cse",
    },
    uploadHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],
    isBlocked: { type: Boolean, default: false }

  },
  
  { timestamps: true }
);

userSchema.index({ email: 1 ,name:1});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const User = mongoose.model("User", userSchema);

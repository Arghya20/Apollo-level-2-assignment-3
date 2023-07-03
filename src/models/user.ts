import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);

import mongoose from "mongoose";

export interface userInputType {
  name: string;
  email: string;
  password: string;
}

export interface userDocument extends userInputType, mongoose.Document {
  verified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(givenPassword: string): Promise<boolean>;
}

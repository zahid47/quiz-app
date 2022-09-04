import User from "./user.model";
import { userInputType } from "./user.type";
import { UpdateQuery } from "mongoose";

export const createUser = async (input: userInputType) => {
  return await User.create(input);
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUsers = async (limit: number, skip: number) => {
  return await User.find().limit(limit).skip(skip);
};

export const findAndUpdateUser = async (
  id: string,
  update: UpdateQuery<Partial<userInputType>>
) => {
  return await User.findByIdAndUpdate(id, update, { new: true });
};

export const findAndDeleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

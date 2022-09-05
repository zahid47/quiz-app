import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Quiz from "./quiz.model";

describe("question", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await Quiz.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("sanity check", () => {
    it("has a moddule", () => {
      expect(Quiz).toBeDefined();
    });
  });

  //TODO: complete the tests
});

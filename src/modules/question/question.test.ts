import request from "supertest";
import app from "../../utils/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import config from "../../utils/config";
import Question from "./question.model";
import {
  generateRandomQuestion,
  generateRandomUser,
} from "../../utils/test.randomGenerators";
import { generateAuthTokens } from "../../utils/jwt";
import { createUser } from "../user/user.service";

describe("question", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await Question.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("sanity check", () => {
    it("has a moddule", () => {
      expect(Question).toBeDefined();
    });
  });

  describe("create question", () => {
    describe("POST /question", () => {
      describe("given a title, score and atleast 2 options is not provided", () => {
        it("should return a 400", async () => {
          await request(app)
            .post("/question")
            .send(generateRandomQuestion(1))
            .expect(400);
        });
      });

      describe("given a title, score and atleast 2 options is provided but no user is authenticated", () => {
        it("should return a 401", async () => {
          const question = generateRandomQuestion(2);
          await request(app).post("/question").send(question).expect(401);
        });
      });

      describe("given a title, score and atleast 2 options is provided but authenticated user is not an admin", () => {
        it("should return a 403", async () => {
          const nonAdminUser = await createUser(generateRandomUser());
          const { accessToken } = generateAuthTokens(
            nonAdminUser.id,
            nonAdminUser.role
          );
          const question = generateRandomQuestion(2);

          await request(app)
            .post("/question")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(question)
            .expect(403);
        });
      });

      describe("given a title, score and atleast 2 options is provided and authenticated user is an admin", () => {
        it("should return a 201 and create a question", async () => {
          const nonAdminUser = await createUser(generateRandomUser("admin"));
          const { accessToken } = generateAuthTokens(
            nonAdminUser.id,
            nonAdminUser.role
          );
          const question = generateRandomQuestion(2);

          const response = await request(app)
            .post("/question")
            .set("Authorization", `Bearer ${accessToken}`)
            .send(question)
            .expect(201);

          expect(response.body.title).toBe(question.title);
        });
      });
    });
  });
});

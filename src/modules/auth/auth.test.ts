import request from "supertest";
import app from "../../utils/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../user/user.model";
import { createUser } from "../user/user.service";
import { generateRandomUser } from "../../utils/test.randomGenerators";
import { generateAuthTokens, signToken } from "../../utils/jwt";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import config from "../../utils/config";

describe("auth", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("sanity check", () => {
    it("has a moddule", () => {
      expect(User).toBeDefined();
    });
  });

  describe("login", () => {
    describe("POST /auth/login", () => {
      describe("given email and password is not provided", () => {
        it("should return a 400", async () => {
          const { statusCode } = await request(app).post(`/auth/login`).send(); //sending nothing lol

          expect(statusCode).toBe(400);
        });
      });

      describe("given incorrect email is provided", () => {
        it("should return a 404", async () => {
          const userInfo = generateRandomUser();
          await createUser(userInfo);
          const badEmail = userInfo.email + "x";

          const { statusCode } = await request(app)
            .post(`/auth/login`)
            .send({ email: badEmail, password: userInfo.password }); //sending a wrong email

          expect(statusCode).toBe(404);
        });
      });

      describe("given incorrect password is provided", () => {
        it("should return a 401", async () => {
          const userInfo = generateRandomUser();
          await createUser(userInfo);
          const badPass = userInfo.password + "x";

          const { statusCode } = await request(app)
            .post(`/auth/login`)
            .send({ email: userInfo.email, password: badPass }); //sending a wrong password

          expect(statusCode).toBe(401);
        });
      });

      describe("given correct email and password is provided", () => {
        it("should return a 200 and send an accessToken", async () => {
          const userInfo = generateRandomUser();
          await createUser(userInfo);

          const { statusCode, body } = await request(app)
            .post(`/auth/login`)
            .send({ email: userInfo.email, password: userInfo.password });

          expect(statusCode).toBe(200);
          expect(body.accessToken).toBeDefined();
        });
      });
    });
  });

  describe("me", () => {
    describe("GET /auth/me", () => {
      describe("given no user is logged in", () => {
        it("should return a 401", async () => {
          const { statusCode } = await request(app).get(`/auth/me`);

          expect(statusCode).toBe(401);
        });
      });

      describe("given a user is logged in", () => {
        it("should return a 200 and the user", async () => {
          const user = await createUser(generateRandomUser());
          const { accessToken } = generateAuthTokens(user.id, user.role);

          const { statusCode, body } = await request(app)
            .get(`/auth/me`)
            .set("Authorization", `Bearer ${accessToken}`); //sending an access token with the request so that the user is authorized

          expect(statusCode).toBe(200);
          expect(body._id).toEqual(user.id);
        });
      });
    });
  });

  describe("refresh", () => {
    describe("GET /auth/refresh", () => {
      describe("given no refresh token is provided", () => {
        it("should return a 400", async () => {
          const { statusCode } = await request(app).get(`/auth/refresh`);

          expect(statusCode).toBe(400);
        });
      });

      describe("given refresh token is valid", () => {
        it("should return a 200 and a new accessToken", async () => {
          const user = await createUser(generateRandomUser());
          const { refreshToken } = generateAuthTokens(user.id, user.role);

          const { statusCode, body } = await request(app).get(
            `/auth/refresh?refreshToken=${refreshToken}`
          );

          expect(statusCode).toBe(200);
          expect(body.accessToken).toBeDefined();
        });
      });
    });
  });

  describe.skip("reset-pass/:code", () => {
    describe("GET /auth/reset-pass/:code", () => {
      describe("given no code is provided", () => {
        it("should return a 400", async () => {
          const { statusCode } = await request(app).post(`/auth/reset-pass/`);

          expect(statusCode).toBe(400);
        });
      });

      describe("given no new password provided", () => {
        it("should return a 400", async () => {
          const user = await createUser(generateRandomUser());
          const code = signToken(
            user.id,
            config.EMAIL_SECRET,
            config.EMAIL_TTL,
            { for: " reset-pass" }
          );

          const { statusCode } = await request(app).post(
            `/auth/reset-pass/${code}`
          );

          expect(statusCode).toBe(400);
        });
      });

      describe("given code and new password is provided", () => {
        it("should return a 200 and change the password", async () => {
          const user = await createUser(generateRandomUser());
          const code = signToken(
            user.id,
            config.EMAIL_SECRET,
            config.EMAIL_TTL,
            { for: " reset-pass" }
          );

          const { statusCode } = await request(app)
            .post(`/auth/reset-pass/${code}`)
            .send({ password: "newPassword" });

          expect(statusCode).toBe(200);
        });
      });
    });
  });
});

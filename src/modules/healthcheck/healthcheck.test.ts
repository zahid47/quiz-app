import request from "supertest";
import app from "../../utils/app";
import { describe, it, expect } from "vitest";

describe("healthcheck", () => {
  describe("GET /healthcheck", () => {
    describe("given the server is working", () => {
      it("should return a 200 and success should be true", async () => {
        const { statusCode, body } = await request(app).get(
          `/healthcheck`
        );

        expect(statusCode).toBe(200);
        expect(body.success).toBe(true);
      });
    });
  });
});

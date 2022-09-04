import envSchema from "env-schema";
import { Type, Static } from "@sinclair/typebox";

const schema = Type.Object({
  PORT: Type.Number({ default: 8000 }),
  HOST: Type.String({ default: "0.0.0.0" }),
  DATABASE_URL: Type.String(),
  CLIENT_URL: Type.String(),
  ACCESS_SECRET: Type.String(),
  REFRESH_SECRET: Type.String(),
  EMAIL_SECRET: Type.String(),
  ACCESS_TTL: Type.String(),
  REFRESH_TTL: Type.String(),
  EMAIL_TTL: Type.String(),
  ETHEREAL_EMAIL: Type.String(),
  ETHEREAL_PASSWORD: Type.String(),
});

type Env = Static<typeof schema>;

const config = envSchema<Env>({
  schema,
  dotenv: true,
});

export default config;

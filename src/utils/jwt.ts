import JWT, { JwtPayload } from "jsonwebtoken";
import log from "./logger";
import config from "./config";

interface payloadType extends JwtPayload {
  role?: string;
}

export const signToken = (
  userId: string,
  role: string,
  secret: string,
  expiry: string,
  payload: payloadType = {}
) => {
  const options = {
    expiresIn: expiry,
    issuer: "dynamic-quiz",
    audience: userId,
  };
  payload.role = role;

  return JWT.sign(payload, secret, options);
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const payload = JWT.verify(token, secret);

    return {
      valid: true,
      expired: false,
      payload,
    };
  } catch (err: any) {
    log.error(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};

export const generateAuthTokens = (userId: string, role: string) => {
  try {
    const access_secret = config.ACCESS_SECRET;
    const refresh_secret = config.REFRESH_SECRET;
    const access_expiry = config.ACCESS_TTL;
    const refresh_expiry = config.REFRESH_TTL;

    const accessToken = signToken(userId, role, access_secret, access_expiry);
    const refreshToken = signToken(
      userId,
      role,
      refresh_secret,
      refresh_expiry
    );

    return { accessToken, refreshToken };

    // skipcq
  } catch (err: any) {
    throw new Error(err);
  }
};

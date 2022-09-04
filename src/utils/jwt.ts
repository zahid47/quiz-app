import JWT, { JwtPayload } from "jsonwebtoken";
import log from "./logger";
import config from "./config";

interface payloadType extends JwtPayload {
  role?: string;
  for?: string;
}

export const signToken = (
  audience: string,
  secretOrPrivateKey: string,
  expiresIn: string,
  payload: payloadType = {}
) => {
  const options = {
    expiresIn,
    audience,
    issuer: "dynamic-quiz",
  };

  return JWT.sign(payload, secretOrPrivateKey, options);
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
  const access_secret = config.ACCESS_SECRET;
  const refresh_secret = config.REFRESH_SECRET;
  const access_expiry = config.ACCESS_TTL;
  const refresh_expiry = config.REFRESH_TTL;

  const accessToken = signToken(userId, access_secret, access_expiry, {
    role,
  });
  const refreshToken = signToken(userId, refresh_secret, refresh_expiry, {
    role,
  });

  return { accessToken, refreshToken };
};

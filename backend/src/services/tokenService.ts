import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const jwt = require("jsonwebtoken");

export interface ITokenService {
  genToken: (payload: JwtPayload, options: SignOptions) => string | undefined;
  verifyToken: (token: string, secret: Secret) => boolean;
}

class TokenService implements ITokenService {
  genToken(payload: JwtPayload, options?: SignOptions): string | undefined {
    try {
      const secret: Secret = process.env.SECRET_KEY as string;
      const token = jwt.sign(payload, secret, options);
      return token;
    } catch (e) {
      console.log(e);
    }
  }
  verifyToken(token: string, secret: Secret) {
    try {
      const secret: Secret = process.env.SECRET_KEY as string;
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      return true;
    } catch (e) {
      console.log("JWT NOT VERIFYED");
      return false;
    }
  }
}

exports.tokenService = new TokenService();

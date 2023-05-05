import {JsonWebTokenError, JwtPayload, Secret, SignOptions} from "jsonwebtoken";

const jwt = require("jsonwebtoken");

export interface ITokenService {
  genToken: (payload: JwtPayload, options: SignOptions) => string | undefined;
  verifyToken: (token: string, secret: Secret) => boolean;
}

class TokenService implements ITokenService {
  genToken(payload: JwtPayload, options?: SignOptions): string | undefined {
    try {
      const secret: Secret = process.env.SECRET_KEY as string;
      return jwt.sign(payload, secret, options);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  verifyToken(token: string): boolean {
    try {
      const secret: Secret = process.env.SECRET_KEY as string;
      return jwt.verify(token, secret);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

const tokenService = new TokenService();
export default tokenService;
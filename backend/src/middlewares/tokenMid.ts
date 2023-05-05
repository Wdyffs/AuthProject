import {NextFunction, Request, Response} from "express";
import tokenService from "../services/tokenService";


function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const {token} = req.body;
    tokenService.verifyToken(token);
    res.statusCode = 200;
    next();
  } catch (e) {
    console.log(e);
    res.statusCode = 401;
    res.json({
      status: res.statusCode,
      message: "Unauthorized",
    });
  }
}

export default tokenMiddleware;

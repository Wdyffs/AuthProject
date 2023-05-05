import {NextFunction, Request, Response} from "express";

function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const regex = new RegExp("https?://localhost:[0-9]+");
  if (regex.test(req.headers.origin as string)) {
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-METHODS", "GET,POST,PUT,DELETE,PATCH,UPDATE");
    res.set("Access-Control-Allow-Headers", "content-type");
  }
  next();
}

export default corsMiddleware;
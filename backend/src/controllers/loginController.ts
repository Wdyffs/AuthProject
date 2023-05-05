import {Request, Response} from "express";
import {Database} from "sqlite3";
import tokenService from "../services/tokenService";

function loginController(db: Database) {
  return (req: Request, res: Response) => {
    try {
      const {login, password} = req.body;
      db.get(
        `SELECT login,password FROM users WHERE login = '${login}' and password = '${password}'`,
        function (err: any | null, row: any) {
          if (err) {
            res.statusCode = 500;
            return res.json({
              status: 500,
              message: "Internal server error",
            });
          }
          if (row) {
            const token = tokenService.genToken({login}, {expiresIn: 100});
            return res.json({
              status: 200,
              message: "Success",
              token,
            });
          } else {
            return res.json({
              status: res.statusCode,
              message: "Incorrect login or password",
            });
          }
        }
      );
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default loginController;
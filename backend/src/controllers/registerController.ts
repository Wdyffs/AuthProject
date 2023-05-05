import {Database} from "sqlite3";
import {Request, Response} from "express";
import validationService from "../services/validate";

function registerController(db: Database) {
  return (req: Request, res: Response) => {
    try {
      const {login, password} = req.body;
      validationService.validateLogin(login);
      validationService.validatePassword(password);

      db.serialize(function () {
        db.get(
          `SELECT login FROM users WHERE login = '${login}'`,
          function (err: any | null, row: any) {
            if (err) {
              return res.json({
                status: 500,
                message: "Internal server error",
              });
            }
            if (row) {
              res.statusCode = 409;
              return res.json({
                status: 409,
                message: `The user "${login}" is already exists`,
              });
            } else {
              db.serialize(function () {
                db.run(
                  `INSERT INTO users (login, password) VALUES ($login, $password)`,
                  [login, password],
                  function (err: any | null) {
                    if (err) {
                      let message: string = err.message;
                      res.statusCode = 409;
                      return res.json({status: 409, message: message});
                    } else {
                      return res.json({status: 200, message: "Successfull"});
                    }
                  }
                );
              });
            }
          }
        );
      });
    } catch (e: any) {
      return res.json({status: 403, message: e});
    }
  }
}

export default registerController;
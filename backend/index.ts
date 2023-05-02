import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sqlite3 } from "sqlite3";
const { validationService } = require("./src/utils/validate");

dotenv.config();

const bodyParser = require("body-parser");

const sqlite3: sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./src/db/database.db",
  sqlite3.OPEN_READWRITE,
  (err: Error | null) => {
    if (err) {
      console.log(err.message);
    }
    console.log("Connection has done successfull");
  }
);

const app: Express = express();
const port = process.env.PORT || 3000;
const sql = `SELECT id, login, password FROM users`;

app.use((req: Request, res: Response, next) => {
  const regex = new RegExp("https?://localhost:[0-9]+");
  if (regex.test(req.headers.origin as string)) {
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-METHODS", "GET,POST,PUT,DELETE,PATCH,UPDATE");
    res.set("Access-Control-Allow-Headers", "content-type");
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/app/take", (req: Request, res: Response) => {
  try {
    db.all(sql, (err: Error | null, row: any) => {
      if (err) {
        throw Error(err.message);
      }
      if (row === undefined) {
        throw Error("No data for that query");
      }
      console.log(row);
      res.send(row);
    });
  } catch (err: any) {
    console.log(err.message);
    res.send("Error");
  }
});

app.post("/app/register", (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
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
                    return res.json({ status: 409, message: message });
                  } else {
                    return res.json({ status: 200, message: "Successfull" });
                  }
                }
              );
            });
          }
        }
      );
    });
  } catch (e: any) {
    return res.json({ status: 403, message: e });
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

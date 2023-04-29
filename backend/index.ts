import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sqlite3 } from "sqlite3";
const cors = require("cors");
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

// app.use(cors());
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const { login, password } = req.body;
    validationService.validateLogin(login);
    validationService.validatePassword(password);

    db.run(
      `INSERT INTO users (login, password) VALUES ($login, $password)`,
      [login, password],
      function (err: any | null) {
        if (err) {
          let message: string = err.message;
          if (err.code === "SQLITE_CONSTRAINT") {
            message = `There is already exist user with login "${login}"`;
          }
          res.statusCode = 400;
          res.json({ status: res.statusCode, message });
        } else {
          res.statusCode = 200;
          res.json({ states: 200, message: "Successfull" });
        }
      }
    );
  } catch (e: any) {
    res.json({ status: 400, message: e });
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

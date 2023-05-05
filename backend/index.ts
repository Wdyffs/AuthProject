import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {sqlite3} from "sqlite3";
import tokenMiddleware from "./src/middlewares/tokenMid";
import corsMiddleware from "./src/middlewares/corsMid";
import loginController from "./src/controllers/loginController";
import registerController from "./src/controllers/registerController";

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

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/app/register", registerController(db));
app.post("/app/login", loginController(db));
app.post("/app/verify", tokenMiddleware, (req: Request, res: Response) => {
  try {
    res.statusCode = 200;
    res.json({
      status: 200,
      message: "Login success",
    })
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

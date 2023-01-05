import Koa from "koa";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import path from "path";
import echo from "./routes/echo";

dotenv.config({ path: path.join(__dirname, ".env") });

const { PORT = 3000, SECRET } = process.env;

const app = new Koa();

app.keys = [SECRET];

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(bodyParser());
app.use(echo.allowedMethods());
app.use(echo.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

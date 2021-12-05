const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const globalRouter = require("./routers/globalRouter");
const boardRouter = require("./routers/boardRouter");
const webtoonRouter = require("./routers/webtoonRouter");
const path = require("path");
const session = require("express-session");

const PORT = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/assets")));
app.use(
  session({
    secret: "wow_projct",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", globalRouter);
app.use("/board", boardRouter);
app.use("/webtoon", webtoonRouter);

app.listen(PORT, () => {
  console.log(`🐾🐶http://localhost:${PORT} WOW✨ SERVER START🐰🥕`);
});

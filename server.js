import express from "express";
import path from "path";
import jsonServer from "json-server";
import cors from "cors";

const app = express();

// json-server
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares); // 🔥 이거 추가

// API
app.use("/api", router);

// 정적 파일
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 🔥 핵심: host 추가
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on ${PORT}`);
});
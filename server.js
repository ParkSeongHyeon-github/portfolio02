import express from "express";
import path from "path";
import jsonServer from "json-server";
import cors from "cors";

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(cors());

app.use("/api", router);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
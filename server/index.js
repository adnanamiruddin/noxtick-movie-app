import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const port = process.env.PORT || 8082;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb Connected bang");
    server.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

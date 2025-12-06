import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";

dotenv.config();
connectDb();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Mernote");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

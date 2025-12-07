import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
connectDb();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Mernote");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);

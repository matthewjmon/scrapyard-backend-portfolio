import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { validatePortfolioMongoUri } from "./utils/validatePortfolioMongoUri.js";

import recordRoutes from "./routes/records.js";
import authRoutes from "./routes/auth.js"; 
import profileRoutes from "./routes/profile.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;
const mongoUri = process.env.MONGO_URI;

// Safety check: only allow demo/portfolio-style DB names.
validatePortfolioMongoUri(mongoUri);

app.use(cors());
app.use(express.json());

app.use("/api/records", recordRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Start API only after Mongo connection succeeds.
mongoose.connect(mongoUri)
  .then(() => app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  ))
  .catch(err => console.error(err));

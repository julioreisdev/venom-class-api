import express from "express";
import "dotenv/config";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import venomRoutes from "./routes/venomRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/static", express.static(path.join(__dirname, "public", "static")));

app.use(express.json());
app.use(cors());
app.use(testRoutes);
app.use(venomRoutes);

export default app;

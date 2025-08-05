import express from "express";
import "dotenv/config";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import venomRoutes from "./routes/venomRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(testRoutes);
app.use(venomRoutes);

export default app;

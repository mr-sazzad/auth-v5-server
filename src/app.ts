import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { globalRoutes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Recipe-Server",
    author: "sazzad-karim",
    version: "1.0.0",
    start_date: "2024-01-15",
    greetings: "Welcome to the Recipe-Server",
  });
});

app.use("/api/v1", globalRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;

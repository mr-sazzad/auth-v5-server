import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 8080;

async function bootstrap() {
  const server: Server = app.listen(port, () => {
    console.log(`Recipe server running on http://localhost:${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {});
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

bootstrap();

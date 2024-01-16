import express from "express";
import { router } from "./routes";

// declaration
const app = express();
import "./database";

// settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// routes
app.use("/api", router);

// starting the server
app.listen(app.get("port"), () => {
  console.log("Server running on port", app.get("port"));
});

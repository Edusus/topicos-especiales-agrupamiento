import { Router } from "express";

//Routers
import playRouter from "../plays/plays.routes";
export const router = Router();

// test endpoint
router.get("/ping", (_req, res) => {
  res.send("Funcionó bien " + new Date().toLocaleDateString());
});

router.use("/plays", playRouter);

import { Router } from "express";

const router = Router();

router.get("/helloworld", (req, res) => {
  res.send("Hello, World!");
});

export default router;

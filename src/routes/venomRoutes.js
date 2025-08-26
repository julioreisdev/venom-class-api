import { Router } from "express";
import venomControllers from "../controllers/venomControllers.js";

const router = Router();

router.get("/", venomControllers.home); // Initialize the
router.get("/init", venomControllers.connection); // Initialize the connection to WhatsApp
router.get("/start", venomControllers.start); // Start listening for messages
router.get("/stop", venomControllers.stop); // Stop listening for messages
router.get("/send-text/:to/:body", venomControllers.sendText); // Send a text message
router.get("/export-contacts", venomControllers.exportContacts); // Export contacts

export default router;

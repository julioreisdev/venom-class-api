import {
  getAllTxtFiles,
  getFilePerPrefix,
  read,
} from "../utils/filemanager.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function start(client) {
  client.onMessage((message) => {
    if (!message.isGroupMsg && !message.body.includes("status@broadcast")) {
      console.log("message", message);

      getFilePerPrefix("../databases", message.body)
        .then((data) => {
          client.sendText(message.from, `${data.trim()}`);
        })
        .catch((err) => {
          getAllTxtFiles("../databases").then((options) => {
            const menuPath = path.join(__dirname, "../databases/menu.txt");
            read(menuPath).then((data) => {
              client.sendText(message.from, `${data.trim()}\n\n${options}`);
            });
          });
        });
    }
  });
}

function sendText(client, to, body) {
  return client.sendText(to, body);
}

const venomServices = {
  start,
  sendText,
};

export default venomServices;

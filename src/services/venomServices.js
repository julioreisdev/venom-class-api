import {
  getAllTxtFiles,
  getFilePerPrefix,
  read,
} from "../utils/filemanager.js";
import path from "path";
import { fileURLToPath } from "url";
import detectHuman from "../utils/detect-human.js";
import { callGemini } from "../utils/call-gemini.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let firstMessage = true;
let iaMode = false; // depois que detectar humano, só IA responde

function start(client) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg && !message.body.includes("status@broadcast")) {
      console.log("message", message);

      // Se IA já assumiu, ignora menu/opções
      if (iaMode) {
        const chatHistory = await client.getAllMessagesInChat(
          message.chatId,
          true,
          true
        );

        const iaresponse = await callGemini(message.body,chatHistory);
        await client.sendText(message.from, iaresponse);
        return;
      }

      // Primeira mensagem → sempre manda menu
      if (firstMessage) {
        const menuPath = path.join(__dirname, "../databases/menu.txt");
        const menu = await read(menuPath);
        const options = await getAllTxtFiles("../databases");
        await client.sendText(message.from, `${menu.trim()}\n\n${options}`);
        firstMessage = false;
        return;
      }

      // Tenta achar opção válida
      getFilePerPrefix("../databases", message.body)
        .then(async (data) => {
          await client.sendText(message.from, `${data.trim()}`);
        })
        .catch(async () => {
          // Se não for opção válida, checa se quer falar com humano
          if (detectHuman(message.body)) {
            iaMode = true; // ativa modo IA

            const chatHistory = await client.getAllMessagesInChat(
              message.chatId,
              true,
              true
            );

            const iaresponse = await callGemini(message.body,chatHistory);
            await client.sendText(message.from, iaresponse);
          }
        });
    }
  });
}

function sendText(client, to, body) {
  return client.sendText(to, body);
}

function exportContacts(client) {
  return client.getAllContacts();
}

const venomServices = {
  start,
  sendText,
  exportContacts,
};

export default venomServices;

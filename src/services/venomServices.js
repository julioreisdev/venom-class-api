import {
  getAllTxtFiles,
  getFilePerPrefix,
  read,
} from "../utils/filemanager.js";
import path from "path";
import { fileURLToPath } from "url";
import { talkHuman } from "../utils/talk-humanity.js";
import callGemini from "../utils/call-ia.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function start(client) {
  let talk = 0
  client.onMessage(async (message) => {
    if (!message.isGroupMsg && !message.body.includes("status@broadcast")) {
      console.log("message", message);

      if (talkHuman(message.body)) {
        talk += 1
      }
      if (talk === 0) {
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



      } else {
        if (talk === 1) {
          talk += 1
          client.sendText(message.from, `Olá! No momento não há nenhum atendente humano disponível. Mas posso te ajudar com dúvidas sobre a Venom Class e a API venom-bot.`)
        }else{
          const chatId = message.from
          const history = await client.getAllMessagesInChat(chatId, true, true)
          const context = history.map(msg => msg.body).join('\n')

          const iaResponse = await callGemini(message.body,context )
          client.sendText(message.from, iaResponse)

        }
      }

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
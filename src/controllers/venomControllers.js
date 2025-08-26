import venom from "venom-bot";
import XLSX from "xlsx";
import "dotenv/config";
import venomServices from "../services/venomServices.js";
import { template, textResponseInTemplate } from "../utils/template.js";
import fs from "fs/promises"; // usar versão async
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let venomClient = null;

function home(req, res) {
  res.send(template());
}

// function connection(req, res) {
//   venom
//     .create({
//       session: process.env.SESSION,
//       headless: "new",
//       puppeteerOptions: {
//         protocolTimeout: 120000,
//       },
//     })
//     .then((client) => {
//       venomClient = client;
//       res.send(textResponseInTemplate("WhatsApp conectado com a Venom API!"));
//     })
//     .catch((error) => {
//       console.log(error);
//       res
//         .sendStatus(500)
//         .send(textResponseInTemplate("Erro ao conectar com a Venom API!"));
//     });
// }

async function connection(req, res) {
  try {
    const client = await venom.create({
      session: process.env.SESSION,
      headless: "new",
      puppeteerOptions: {
        protocolTimeout: 120000,
      },
      logQR: false,
      catchQR: async (base64Qr, asciiQR, attempts, urlCode) => {
        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error("QR base64 inválido.");
        }

        const buffer = Buffer.from(matches[2], "base64");
        const qrPath = path.join(__dirname, "../public/static/qrcode.png");
        await fs.writeFile(qrPath, buffer);

        res.send(
          textResponseInTemplate("Escaneie o QR Code para conectar:", {
            qrCode: true,
          })
        );
      },
    });

    venomClient = client;

    if (venomClient) {
      res.send(textResponseInTemplate("WhatsApp conectado com a Venom API!"));
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(textResponseInTemplate("Erro ao conectar com a Venom API!"));
  }
}

function start(req, res) {
  if (venomClient) {
    venomServices.start(venomClient);
    res.send(
      textResponseInTemplate("Escuta de mensagens iniciada com sucesso!")
    );
  } else {
    res
      .status(400)
      .send(
        textResponseInTemplate("Nenhuma conexão ativa para iniciar a escuta.")
      );
  }
}

function stop(req, res) {
  if (venomClient) {
    venomClient
      .close()
      .then(() => {
        venomClient = null;
        res.send(
          textResponseInTemplate(
            "Conexão com o WhatsApp encerrada com sucesso!"
          )
        );
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(
            textResponseInTemplate("Erro ao encerrar a conexão com o WhatsApp!")
          );
      });
  } else {
    res
      .status(400)
      .send(textResponseInTemplate("Nenhuma conexão ativa para encerrar."));
  }
}

function sendText(req, res) {
  const { to, body } = req.params;

  if (!to || !body) {
    return res
      .status(400)
      .send(
        textResponseInTemplate("Parâmetros 'to' e 'body' são obrigatórios.")
      );
  }

  if (venomClient) {
    venomServices
      .sendText(venomClient, `${to}@c.us`, body)
      .then((result) => {
        res.send(
          textResponseInTemplate(`Mensagem enviada para ${to}: ${body}`)
        );
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(textResponseInTemplate("Erro ao enviar a mensagem."));
      });
  } else {
    res
      .status(400)
      .send(
        textResponseInTemplate("Nenhuma conexão ativa para enviar mensagens.")
      );
  }
}

// function exportContacts(req, res) {
//   if (venomClient) {
//     venomServices
//       .exportContacts(venomClient)
//       .then((contacts) => {
//         // Mapeia para o formato desejado
//         const formatted = contacts.map((c) => ({
//           nome:
//             c.verifiedName || c.name || c.shortName || c.pushname || c.id.user,
//           telefone: c.id.user || "",
//         }));
//         res.json(formatted);
//       })
//       .catch((error) => {
//         console.log(error);
//         res
//           .status(500)
//           .send(textResponseInTemplate("Erro ao exportar os contatos."));
//       });
//   } else {
//     res
//       .status(400)
//       .send(
//         textResponseInTemplate("Nenhuma conexão ativa para exportar contatos.")
//       );
//   }
// }
function exportContacts(req, res) {
  if (venomClient) {
    venomServices
      .exportContacts(venomClient)
      .then((contacts) => {
        const formatted = contacts.map((c) => ({
          nome:
            c.verifiedName || c.name || c.shortName || c.pushname || c.id.user,
          telefone: c.id.user || "",
        }));

        // Cria uma planilha XLSX
        const worksheet = XLSX.utils.json_to_sheet(formatted);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contatos");

        // Gera o buffer do arquivo
        const buffer = XLSX.write(workbook, {
          type: "buffer",
          bookType: "xlsx",
        });

        res.setHeader(
          "Content-Disposition",
          "attachment; filename=contatos.xlsx"
        );
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.send(buffer);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .send(textResponseInTemplate("Erro ao exportar os contatos."));
      });
  } else {
    res
      .status(400)
      .send(
        textResponseInTemplate("Nenhuma conexão ativa para exportar contatos.")
      );
  }
}

const venomControllers = {
  connection,
  start,
  stop,
  sendText,
  home,
  exportContacts,
};

export default venomControllers;

import venom from "venom-bot";
import "dotenv/config";
import venomServices from "../services/venomServices.js";

let venomClient = null;

function home(req, res) {
  res.send(
    "<h1><a href='/init'>Clique aqui para iniciar a conexão com o WhatsApp</a></h1>"
  );
}

function connection(req, res) {
  venom
    .create({
      session: process.env.SESSION,
      headless: "new",
      puppeteerOptions: {
        protocolTimeout: 120000,
      },
    })
    .then((client) => {
      venomClient = client;
      res.send("WhatsApp conectado com a Venom API!");
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500).send("Erro ao conectar com a Venom API!");
    });
}

function start(req, res) {
  if (venomClient) {
    venomServices.start(venomClient);
    res.send("Escuta de mensagens iniciada com sucesso!");
  } else {
    res.status(400).send("Nenhuma conexão ativa para iniciar a escuta.");
  }
}

function stop(req, res) {
  if (venomClient) {
    venomClient
      .close()
      .then(() => {
        venomClient = null;
        res.send("Conexão com o WhatsApp encerrada com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Erro ao encerrar a conexão com o WhatsApp!");
      });
  } else {
    res.status(400).send("Nenhuma conexão ativa para encerrar.");
  }
}

function sendText(req, res) {
  const { to, body } = req.params;

  if (!to || !body) {
    return res.status(400).send("Parâmetros 'to' e 'body' são obrigatórios.");
  }

  if (venomClient) {
    venomServices
      .sendText(venomClient, `${to}@c.us`, body)
      .then((result) => {
        res.send(`Mensagem enviada para ${to}: ${body}`);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Erro ao enviar a mensagem.");
      });
  } else {
    res.status(400).send("Nenhuma conexão ativa para enviar mensagens.");
  }
}

const venomControllers = {
  connection,
  start,
  stop,
  sendText,
  home,
};

export default venomControllers;

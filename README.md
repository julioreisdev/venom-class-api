<img width="100" height="100" alt="logo" src="https://github.com/user-attachments/assets/d2699dc7-a9ae-4b50-ba76-208c5882e988" />

# Venom Class API

Uma API web simples para integração com o WhatsApp usando [venom-bot](https://github.com/orkestral/venom). Permite gerar QR Code para autenticação, ativar o bot, enviar mensagens e encerrar a sessão via endpoints HTTP.

## Funcionalidades

- **Gerar QR Code:** Autentique sua sessão WhatsApp escaneando o QR Code.
- **Ativar Bot:** Inicia a escuta de mensagens recebidas.
- **Enviar Mensagem:** Envie mensagens de texto para qualquer número WhatsApp.
- **Desconectar:** Encerre a sessão do WhatsApp.
- **Interface Web:** Página inicial com links para todos os endpoints e formulário para envio de mensagens.

## Endpoints

| Método | Rota                                      | Descrição                                 |
|--------|-------------------------------------------|-------------------------------------------|
| GET    | `/`                                       | Página inicial com links e formulário     |
| GET    | `/init`                                   | Gera QR Code para autenticação            |
| GET    | `/start`                                  | Ativa o bot para escutar mensagens        |
| GET    | `/send-text/:to/:body`              | Envia mensagem para o número informado    |
| GET    | `/stop`                                   | Encerra a sessão do WhatsApp              |

## Como usar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/julioreisdev/venom-class-api
   cd venom-class-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

   ```
   BASE_URL=http://localhost:8000
   SESSION=venomclass
   PORT=8000
   ```

4. **Inicie a aplicação:**

   ```bash
   npm start
   ```

5. **Acesse no navegador:**

   ```
   http://localhost:3000
   ```

## Exemplo de uso

- Para enviar uma mensagem:

  ```
  GET /send-text/5598981017658/Oi%20Venom!
  ```

- Para gerar o QR Code:

  ```
  GET /init
  ```

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [venom-bot](https://github.com/orkestral/venom)

## Licença

MIT

---

Desenvolvido por Venom Class [Instrutor Júlio Reis](https://github.com/julioreisdev)

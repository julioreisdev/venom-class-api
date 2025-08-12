import "dotenv/config";

export function template() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Venom Class API</title>
  <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/julioreisdev/venom-class-api/refs/heads/main/src/public/static/logo.png" />

  <!-- Fonte moderna e elegante -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background: #f9fafb;
      color: #1f2937;
      line-height: 1.6;
    }

    header {
      background: linear-gradient(90deg, #1f2937, #4b5563);
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      gap: 1.2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }

    header img {
      width: 80px;
      height: auto;
    }

    header h1 {
      font-size: 2rem;
      color: #facc15;
      font-weight: 700;
      letter-spacing: 1px;
    }

    main {
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }

    main h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #111827;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 0.5rem;
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    li {
      background: #ffffff;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    li:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .method {
      display: inline-block;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 5px;
      font-size: 0.9rem;
    }

    .get {
      background: #d1fae5;
      color: #065f46;
    }

    a {
      color: #2563eb;
      text-decoration: none;
      word-break: break-all;
    }

    a:hover {
      text-decoration: underline;
    }

    /* Estilo do formulário de envio */
    .send-form {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .send-form input {
      padding: 0.6rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border 0.2s ease;
    }

    .send-form input:focus {
      border-color: #2563eb;
    }

    .send-form button {
      background: #2563eb;
      color: white;
      padding: 0.7rem 1rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .send-form button:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <img src="https://raw.githubusercontent.com/julioreisdev/venom-class-api/refs/heads/main/src/public/static/logo.png" alt="Venom API Logo" />
    <h1>Venom Class API</h1>
  </header>

  <main>
    <h2>Endpoints Disponíveis</h2>
    <ul>
      <li>
        Home – <span class="method get">GET</span> 
        <a href="${process.env.BASE_URL}/">${process.env.BASE_URL}/</a>
      </li>
      <li>
        Gerar QRCode – <span class="method get">GET</span> 
        <a href="${process.env.BASE_URL}/init">${process.env.BASE_URL}/init</a>
      </li>
      <li>
        Ativar Bot – <span class="method get">GET</span> 
        <a href="${process.env.BASE_URL}/start">${process.env.BASE_URL}/start</a>
      </li>
      <li>
        Enviar Mensagem de Texto – <span class="method get">GET</span> 
        <a href="${process.env.BASE_URL}/send-text/8981017658/Venom Class API Test">${process.env.BASE_URL}/send-text/8981017658/Venom Class API Test</a>

        <form class="send-form" onsubmit="event.preventDefault(); sendCustomMessage();">
          <input type="text" id="phone" placeholder="Número de destino (ex: 5598981017658)" required />
          <input type="text" id="message" placeholder="Mensagem" required />
          <button type="submit">Enviar Mensagem</button>
        </form>
      </li>
      <li>
        Desconecta Venom API – <span class="method get">GET</span> 
        <a href="${process.env.BASE_URL}/stop">${process.env.BASE_URL}/stop</a>
      </li>
    </ul>
  </main>

  <script>
    function sendCustomMessage() {
      const phone = document.getElementById('phone').value.trim();
      const message = encodeURIComponent(document.getElementById('message').value.trim());
      if (phone && message) {
        window.location.href = \`${process.env.BASE_URL}/send-text/\${phone}/\${message}\`;
      }
    }
  </script>
</body>
</html>`;
}

export function textResponseInTemplate(text, others) {
  const qrCode = others?.qrCode
    ? `<div class="qr-code-container">
        <img class="qr-code-img" src="${process.env.BASE_URL}/static/qrcode.png" alt="QR Code" />
      </div>`
    : "";
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Venom Class API</title>
  <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/julioreisdev/venom-class-api/refs/heads/main/src/public/static/logo.png" />

  <!-- Fonte moderna e elegante -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    body {
      background: #f9fafb;
      color: #1f2937;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    header {
      background: linear-gradient(90deg, #1f2937, #4b5563);
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      gap: 1.2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }

    header img {
      width: 80px;
      height: auto;
    }

    header h1 {
      font-size: 2rem;
      color: #facc15;
      font-weight: 700;
      letter-spacing: 1px;
    }

    main {
      flex: 1;
      padding: 2rem;
      max-width: 700px;
      margin: auto;
      
      justify-content: center;
    }

    .message {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: #374151;
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    .qr-code-img {
      width: 250px;
      border-radius: 12px;
      text-align: center;
    }

    .qr-code-container {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

     .flex-center {
      display: flex;
      justify-content: center;
    }

    .btn-back {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s ease, transform 0.2s ease;
    }

    .btn-back:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <header>
    <img src="https://raw.githubusercontent.com/julioreisdev/venom-class-api/refs/heads/main/src/public/static/logo.png" alt="Venom API Logo" />
    <h1>Venom Class API</h1>
  </header>

  <main>
    <div class="message">${text}</div>
    ${qrCode}
    <div class="flex-center">
      <a class="btn-back" href="${process.env.BASE_URL}/">← Voltar para a Home</a>
    </div>
  </main>
</body>
</html>`;
}

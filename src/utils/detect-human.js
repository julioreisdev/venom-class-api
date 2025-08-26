import { talkSome } from "./talk-some.js";


export default function detectHuman(mensagem) {

  const texto = mensagem.toLowerCase();

  const todasPalavras = [
    ...talkSome.verbos,
    ...talkSome.expressoes,
    ...talkSome.palavrasChave
  ];

  return todasPalavras.some(palavra => texto.includes(palavra));
}


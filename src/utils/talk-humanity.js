import { talkSome } from "./talk-somebody.js";
export const talkHuman = (msg) =>{
    const text = msg.toLowerCase();
    const allWords =[
        ...talkSome.expressions,
        ...talkSome.keyWords,
        ...talkSome.verbs
    ]

    return allWords.some(word => text.includes(word))
}

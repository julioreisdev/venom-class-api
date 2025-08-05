import fs from "fs";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFile = promisify(fs.readFile);

export async function read(source) {
  return await getFile(source, "utf-8");
}

export async function getFilePerPrefix(dir, prefix) {
  const dirPath = path.join(__dirname, dir);
  const files = await fs.promises.readdir(dirPath);
  const targetFile = files.find(
    (file) => file.startsWith(prefix) && file.endsWith(".txt")
  );
  if (!targetFile) {
    throw new Error("Mensagem inválida. Responda com uma das opções listadas.");
  }
  return await getFile(path.join(dirPath, targetFile), "utf-8");
}

export async function getAllTxtFiles(dir) {
  const dirPath = path.join(__dirname, dir);
  const files = await fs.promises.readdir(dirPath);
  const txtFiles = files.filter((file) => file.endsWith(".txt"));

  let options = "";

  for (const file of txtFiles) {
    if (!file.includes("menu")) {
      options += `${file.replace(".txt", "")}\n`;
    }
  }
  return options;
}

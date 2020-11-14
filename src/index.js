require("dotenv").config();
const path = require("path");
const readlineSync = require('readline-sync');

let directory, finalPath;
if(process.env.MODE === "dev") {
  directory = path.resolve(__dirname, "..", "public");
  finalPath = path.resolve(__dirname, "..", "public", "converted");
}else {
  directory = path.resolve();
  finalPath = path.resolve("converted");
}


const { GetValidImages, ConvertImages, ResetFinalDirectory, ValidateExtension, allowedExtensions } = require("./core");

(async () => {
  try {
    /*entrada de dados */
    const entrySizes = readlineSync.question("Informe a largura das imagens separados por (,) \nExemplo: 100, 300:\n");
    const entryExts = readlineSync.question(`Informe as extensões das imagens separados por (,): \nExemplo: webp, png \nPermitidas: ${allowedExtensions.join(', ')}:\n`);
    const sizes = entrySizes.split(",");
    const exts = entryExts.split(",");
  
    if(!sizes.length || !exts.length) throw new Error("Entrada inválida \n Larguras ou extensões não informadas.");
    exts.forEach((ext) => {
      if(!ValidateExtension(ext)) throw new Error(`Extensão '${ext}' inválida.`);
    })
  
    await ResetFinalDirectory(finalPath);
    const entryFiles = await GetValidImages(directory);
    const convertedFilesLog = await ConvertImages(entryFiles, sizes, exts, finalPath);
    console.log(convertedFilesLog);
    
  } catch ({message}) {
    console.log(message);
  }
})()
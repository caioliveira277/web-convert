const path = require("path");
const readlineSync = require('readline-sync');

/* local */
// const directory = path.resolve(__dirname, "..", "public");
// const finalPath = path.resolve(__dirname, "..", "public", "converted");

const directory = path.resolve();
const finalPath = path.resolve("converted");

const { GetValidImages, ConvertImages, ResetFinalDirectory } = require("./core");

(async () => {
  /*entrada de dados */
  const sizesStr = readlineSync.question("Informe a largura das imagens separados por (,) \nExemplo: 100,300:\n");
  const extsStr = readlineSync.question("Informe as extensões das imagens separados por (,): \nExemplo: webp,png \nPermitidas: jpg, jpeg, png, webp:\n");
  const sizes = sizesStr.split(",");
  const exts = extsStr.split(",");

  if(!sizes.length || !exts.length) return console.log("Falha na entrada de dados");

  await ResetFinalDirectory(finalPath);
  const entryFiles = await GetValidImages(directory);
  const convertedFilesLog = await ConvertImages(entryFiles, sizes, exts, finalPath);
  console.log(convertedFilesLog);
})()
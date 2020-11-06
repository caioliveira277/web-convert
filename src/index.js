const path = require("path");
const directory = path.resolve(__dirname, "..", "public");
const finalPath = path.resolve(__dirname, "..", "public", "converted");

const { GetValidImages, ConvertImages, StartFinalDirectory } = require("./core");

(async () => {
  await StartFinalDirectory(finalPath);
  const entryFiles = await GetValidImages(directory);
  const convertedFilesLog = await ConvertImages(entryFiles, finalPath);
  console.log(convertedFilesLog);
})()
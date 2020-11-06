const path = require("path");
const sharp = require("sharp");
const fsPromises = require("fs").promises;
const fs = require("fs");

module.exports = {
  GetValidImages: async (directory) => {
    try {
      const allFiles = await fsPromises.readdir(directory);
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allFiles) throw new Error("Pasta vazia");

      const validFiles = [];
      for (const file of allFiles) {
        let pathFile = path.resolve(directory, file);
        let fileExtension = path.extname(pathFile);
        let isValidFile = allowedExtensions.find((validExtesion) => fileExtension.toLowerCase() === validExtesion);
        if (isValidFile) validFiles.push(pathFile);
      }

      if (!validFiles.length)
        throw new Error("Nenhum arquivo válido encontrado\n Permitidos: " + allowedExtensions.toString())
      else
        return validFiles;

    } catch (error) {
      return console.trace(error);
    }
  },
  ConvertImages: async (entryFiles = [], finalPath) => {
    try {
      const log = {};
      const parms = {
        files: entryFiles,
        sizes: [100, 200, 300],
        exts: ["jpg", "webp"]
      };

      for (let countFile = 0; countFile < parms.files.length; countFile++) {
        let fileName = path.parse(parms.files[countFile]).name;
        let baseName = path.basename(parms.files[countFile]);

        for (let countSize = 0; countSize < parms.sizes.length; countSize++) {
          for (let countExt = 0; countExt < parms.exts.length; countExt++) {
            await sharp(parms.files[countFile])
              .resize(parms.sizes[countSize], null, {
                fit: sharp.fit.cover,
              })
              .toFormat(parms.exts[countExt], {
                quality: 100
              })
              .toFile(path.resolve(finalPath, `${fileName}-L${parms.sizes[countSize]}.${parms.exts[countExt]}`))
              .then(() => {
                log[baseName] = true;
              })
              .catch(() => {
                log[baseName] = false;
              })
          }
        }
      }
      return log;

    } catch (error) {
      return console.trace(error);
    }
  },
  StartFinalDirectory: async (finalPath) => {
    await fsPromises.rmdir(finalPath, { recursive: true })
    return await fsPromises.mkdir(finalPath);
  }
}
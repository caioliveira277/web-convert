const path = require("path");
const sharp = require("sharp");
const fsPromises = require("fs").promises;
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegtran = require('imagemin-jpegtran');

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
  ConvertImages: async (entryFiles = [], sizes, exts, finalPath) => {
    try {
      const log = {};
      const parms = {
        files: entryFiles,
        sizes,
        exts
      };

      for (let countFile = 0; countFile < parms.files.length; countFile++) {
        let fileName = path.parse(parms.files[countFile]).name;
        let baseName = path.basename(parms.files[countFile]);

        for (let countSize = 0; countSize < parms.sizes.length; countSize++) {
          for (let countExt = 0; countExt < parms.exts.length; countExt++) {
            let outputFile;
            if(parms.exts[countExt] === "png" || parms.exts[countExt] === "jpeg" || parms.exts[countExt] === "jpg"){
              outputFile = path.resolve(finalPath, `${fileName}-L${parms.sizes[countSize]}-temp.${parms.exts[countExt]}`);
            }else {
              outputFile = path.resolve(finalPath, `${fileName}-L${parms.sizes[countSize]}.${parms.exts[countExt]}`);
            }
            await sharp(parms.files[countFile])
              .resize(parseInt(parms.sizes[countSize]), null, {
                fit: sharp.fit.cover,
              })
              .toFormat(parms.exts[countExt], {
                quality: 80,
              })
              .toFile(outputFile)
              .then(async () => {
                if(parms.exts[countExt] === "png" || parms.exts[countExt] === "jpeg" || parms.exts[countExt] === "jpg") {
                  await imagemin([outputFile], {
                    destination: finalPath,
                    plugins: [
                      imageminPngquant({
                        quality: [0.4, 0.5]
                      }),
                      imageminJpegtran()
                    ]
                  });
                }
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
  ResetFinalDirectory: async (finalPath) => {
    await fsPromises.rmdir(finalPath, { recursive: true })
    return await fsPromises.mkdir(finalPath);
  }
}
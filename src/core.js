const path = require("path");
const sharp = require("sharp");
const fsPromises = require("fs").promises;
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegtran = require('imagemin-jpegtran');

const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
const ValidateExtension = (ext) => {
  return allowedExtensions.find((validExtesion) => ext.trim().toLowerCase() === validExtesion);
}
module.exports = {
  GetValidImages: async (directory) => {
    try {
      const allFiles = await fsPromises.readdir(directory);

      if (!allFiles) throw new Error("Pasta vazia");

      const validFiles = [];
      for (const file of allFiles) {
        let pathFile = path.resolve(directory, file);
        let fileExtension = path.extname(pathFile).trim().toLowerCase().split(".").join("");
        if (ValidateExtension(fileExtension)) validFiles.push(pathFile);
      }

      if (!validFiles.length)
        throw new Error("Nenhum arquivo válido encontrado\n Permitidos: " + allowedExtensions.toString())
      else
        return validFiles;

    } catch (error) {
      console.log(error);
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
            let ext = parms.exts[countExt].trim().toLowerCase();

            if(ext === "png" || ext === "jpeg" || ext === "jpg"){
              outputFile = path.resolve(finalPath, `${fileName}-L${parms.sizes[countSize]}-temp.${ext}`);
            }else {
              outputFile = path.resolve(finalPath, `${fileName}-L${parms.sizes[countSize]}.${ext}`);
            }
            await sharp(parms.files[countFile])
              .resize(parseInt(parms.sizes[countSize].trim()), null, {
                fit: sharp.fit.cover,
              })
              .toFormat(ext, {
                quality: 80,
              })
              .toFile(outputFile)
              .then(async () => {
                if(ext === "png" || ext === "jpeg" || ext === "jpg") {
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
                log[baseName] = 'Convertida com sucesso ✅';
              })
              .catch(() => {
                log[baseName] = 'Falha ao converter ❌';
              })
          }
        }
      }
      return log;

    } catch (error) {
      console.trace(error);
    }
  },
  ResetFinalDirectory: async (finalPath) => {
    await fsPromises.rmdir(finalPath, { recursive: true })
    return await fsPromises.mkdir(finalPath);
  },
  ValidateExtension,
  allowedExtensions
}
# Web Convert ⚡
## Conversor de imagens para padrões Web

<br>
<p float="left">
 <img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white">
 <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
</p>
<br>

## Ideia: 💡
***Web Convert*** - É uma cli que permite através de parametros passados, converter e redimencionar **imagens**.

## Funcionalidades:
- Redimencionar imagens;
- Comprimir;
- Converter para Webp, Png, Jpg e Jpeg;
- Filtrar tarefas não finalizadas;

## Começando: 🚀
Para utilizar a cli você precisará seguir os passos abaixo de instalação e utilização.

### Pré-requisitos:
Abaixo estará listada as ferramentas necessárias para o funcionamento do projeto.
- **NodeJS versão 14** <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/nodejs.svg" height="20" /><br>
  [<ins>Guia de instalação NodeJS</ins>](https://nodejs.org/en/).
  
### Instalando a **CLI**:
Execute o comando abaixo para instalar a CLI globalmente:
   ```sh
   npm install -g web-convert
   ```  
  
### Utilizando a **CLI**:
Após a instalação, a CLI estará disponível no seu terminal. Veja o exemplo de utilização.

> Estrutura de pasta do exemplo:
```sh
    .
    ├── Desktop
    │   ├── montain1.png
    │   └── nature1.png
    └── converted *Pasta gerado ao final do processo*
        ├── nature1-L300-temp.jpg
        ├── nature1-L300-temp.jpeg
        ├── nature1-L668-temp.png
        ├── nature1-L720-temp.webp
        ├── montain-L430.png
        ├── montain-L430.webp
        └── ...
```
###### Para o exemplo de utilização, estarei seguindo a estrutura acima

#### Como utilizar:
 <img src="https://caioliveira277.github.io/web-convert/exemplo-uso.gif"  width="600" height="660">

---
## Links: 🌐
***Libs utilizadas para tratamento das imagens:***<br>
[<ins>Image Min</ins>](https://www.npmjs.com/package/imagemin) <br>
[<ins>Node Pngquant</ins>](https://www.npmjs.com/package/pngquant) <br>
[<ins>Sharp</ins>](https://www.npmjs.com/package/sharp) <br>

---
## Licença
Este projeto está licenciado sob a licença [MIT] - consulte o arquivo LICENSE.md para obter detalhes

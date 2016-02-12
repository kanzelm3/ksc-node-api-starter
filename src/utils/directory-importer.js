import fs from 'fs';

export default (dirPath) =>
  fs.readdirSync(dirPath)
    .filter(file => file !== 'index.js')
    .map(file => require(`${dirPath}${file}`).default);

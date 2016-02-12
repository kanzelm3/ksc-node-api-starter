import fs from 'fs';

export default (dirPath) =>
  fs.readdirSync(dirPath)
    .filter(file => file !== 'index.js')
    .filter(file => {
      try {
        return !!require(`${dirPath}${file}`).default;
      } catch (err) {
        return false;
      }
    })
    .map(file => require(`${dirPath}${file}`).default);

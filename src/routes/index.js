import path from 'path';
import dirImporter from '../utils/directory-importer';

const dirPath = path.join(__dirname, './');
export default (server) =>
  dirImporter(dirPath).forEach(lib => lib(server));

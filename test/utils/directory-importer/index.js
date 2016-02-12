import Lab from 'lab';
import Code from 'code';
import path from 'path';
import fs from 'fs';
import dirImporter from '../../../src/utils/directory-importer';
export const lab = Lab.script();

const { experiment, test, beforeEach, afterEach } = lab;
const { expect } = Code;
const dirPath = path.join(__dirname, './');
let files;

experiment('Utils: directory importer', () => {
  experiment('with all ES6 exports', () => {
    beforeEach(done => {
      fs.writeFileSync(`${dirPath}/test1.js`, 'export default "test1";');
      fs.writeFileSync(`${dirPath}/test2.js`, 'export default "test2";');
      fs.writeFileSync(`${dirPath}/test3.js`, 'export default "test3";');
      files = dirImporter(dirPath);
      done();
    });

    test('should return an array', done => {
      expect(files).to.be.an.array();
      done();
    });

    test('should be array of all exported files from directory', done => {
      expect(files).to.have.length(3);
      files.forEach(file => {
        expect(file).to.be.a.string();
        expect(file).to.startWith('test');
      });
      done();
    });

    afterEach(done => {
      fs.unlinkSync(`${dirPath}/test1.js`);
      fs.unlinkSync(`${dirPath}/test2.js`);
      fs.unlinkSync(`${dirPath}/test3.js`);
      done();
    });
  });

  experiment('with mixed files', () => {
    beforeEach(done => {
      fs.writeFileSync(`${dirPath}/test1.js`, 'export default "test1";');
      fs.writeFileSync(`${dirPath}/test2.json`, '{ "test2": true }');
      fs.writeFileSync(`${dirPath}/test3.txt`, 'test3');
      fs.writeFileSync(`${dirPath}/test4.js`, 'export default "test4";');
      files = dirImporter(dirPath);
      done();
    });

    test('should return an array', done => {
      expect(files).to.be.an.array();
      done();
    });

    test('should only contain exported ES6 modules', done => {
      expect(files).to.have.length(2);
      files.forEach(file => {
        expect(file).to.be.a.string();
        expect(file).to.startWith('test');
      });
      done();
    });

    afterEach(done => {
      fs.unlinkSync(`${dirPath}/test1.js`);
      fs.unlinkSync(`${dirPath}/test2.json`);
      fs.unlinkSync(`${dirPath}/test3.txt`);
      fs.unlinkSync(`${dirPath}/test4.js`);
      done();
    });
  });
});

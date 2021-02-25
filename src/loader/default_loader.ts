import Loader from './base_loader';
import util from 'util';
import path from 'path';
import fs from 'fs';
const readFile = util.promisify(fs.readFile);
import { BioLinkJSON } from '../types/types';

export default class DefaultLoader extends Loader {
  async load() {
    const file = await readFile(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
    return this.yaml2json(file) as BioLinkJSON;
  }
}

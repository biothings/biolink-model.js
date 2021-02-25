import Loader from './base_loader';
import path from 'path';
import fs from 'fs';
import { BioLinkJSON } from '../types/types';

export default class SyncDefaultLoader extends Loader {
  load() {
    const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
    return this.yaml2json(file) as BioLinkJSON;
  }
}

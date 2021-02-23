import yaml from 'js-yaml';
import FileLoadingError from '../exceptions/file_loading_error';
import { BioLinkJSON } from '../types/types'

export default abstract class Loader {
    protected yaml2json(input: string) {
        try {
            const doc = yaml.load(input);
            return doc;
        } catch (e) {
            throw new FileLoadingError();
        }
    }
    abstract load(input: string | undefined): Promise<BioLinkJSON>;
}
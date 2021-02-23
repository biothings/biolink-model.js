import axios from 'axios';
import Loader from './base_loader';
import { BioLinkJSON } from '../types/types'


export default class URLLoader extends Loader {
    async load(input) {
        const file = await axios(
            {
                url: input,
                method: 'get',
                responseType: 'text',
            }
        );
        if (typeof file.data === "string") {
            return this.yaml2json(file.data) as BioLinkJSON;
        }
    }
}
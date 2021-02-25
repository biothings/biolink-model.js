import loader from './loader/loader_factory';
import BioLinkClassTree from './class_tree';
import { BioLinkJSON, BioLinkClassTreeObject } from './types/types'

export class BioLink {
    private _biolink_json: BioLinkJSON;
    private _biolink_class_tree: BioLinkClassTreeObject;

    constructor() {
        this._biolink_json = {} as BioLinkJSON;
    }

    async load(source: string = undefined) {
        const l = loader(source);
        this._biolink_json = await l.load(source);
        this._biolink_class_tree = new BioLinkClassTree(this._biolink_json.classes);
        this._biolink_class_tree.construct();
    }

    get classTree() {
        return this._biolink_class_tree;
    }

    get biolinkJSON() {
        return this._biolink_json;
    }

}

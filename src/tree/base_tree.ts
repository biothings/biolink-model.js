import { BaseTreeObject, BioLinkObjects, BioLinkBaseObject, BioLinkObject, BioLinkBase } from '../types/types';
import NodeNotFound from '../exceptions/node_not_found';


export default abstract class BaseTree implements BaseTreeObject {
    protected _objects_in_tree: BioLinkObjects;
    protected _objects_in_yaml: BioLinkBaseObject;
    protected _modify: Function;

    constructor(objects: BioLinkBaseObject) {
        this._objects_in_yaml = objects;
        this._objects_in_tree = {};
        this._modify = (input) => input;
    }

    get objects(): BioLinkObjects {
        return this._objects_in_tree;
    }

    private getUniqueObjects(objects: BioLinkObject[]): BioLinkObject[] {
        const tmpObjs = {};
        objects.map((obj) => {
            tmpObjs[obj.name] = obj;
        });
        return Object.values(tmpObjs);
    }

    private checkIfNodeInTree(name: string): void {
        if (!(this._modify(name) in this._objects_in_tree)) {
            throw new NodeNotFound(`The node you provide ${this._modify(name)} is not in the tree.`);
        }
    }

    protected addNewObjectToTree(name: string): void { };

    construct(): void {
        this._objects_in_tree = {};
        Object.keys(this._objects_in_yaml).map((name) => this.addNewObjectToTree(name));
        Object.keys(this._objects_in_yaml).map((name) => {
            if ('is_a' in this._objects_in_yaml[name]) {
                this._objects_in_tree[this._modify(this._objects_in_yaml[name].is_a)].addChild(name);
            }
        });
    }

    getDescendants(name: string): BioLinkObject[] {
        this.checkIfNodeInTree(name);
        let descendants = [];
        this._objects_in_tree[this._modify(name)].children.map((child) => {
            descendants.push(this._objects_in_tree[child]);
            descendants = [...descendants, ...this.getDescendants(child)];
        });
        return this.getUniqueObjects(descendants);
    }

    getAncestors(name: string): BioLinkObject[] {
        this.checkIfNodeInTree(name);
        let ancestors = [];
        if (typeof this._objects_in_tree[this._modify(name)].parent === 'undefined') {
            return ancestors;
        }
        ancestors.push(this._objects_in_tree[this._objects_in_tree[this._modify(name)].parent]);
        ancestors = [...ancestors, ...this.getAncestors(this._objects_in_tree[this._modify(name)].parent)];
        return this.getUniqueObjects(ancestors);
    }

    getPath(downstreamNode: string, upstreamNode: string): BioLinkObject[] {
        this.checkIfNodeInTree(downstreamNode);
        this.checkIfNodeInTree(upstreamNode);
        let path = [];
        if (
            typeof this._objects_in_tree[this._modify(downstreamNode)].parent === 'undefined' ||
            this._objects_in_tree[this._modify(downstreamNode)].parent === this._modify(upstreamNode)
        ) {
            return path;
        }
        path.push(this._objects_in_tree[this._objects_in_tree[this._modify(downstreamNode)].parent]);
        path = [...path, ...this.getPath(this._objects_in_tree[this._modify(downstreamNode)].parent, upstreamNode)];
        return this.getUniqueObjects(path);
    }
}
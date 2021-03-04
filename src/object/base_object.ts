import { BioLinkObject, BioLinkBase } from '../types/types';

export default abstract class BaseObject implements BioLinkObject {
    protected _description: string;
    protected _parent: string;
    protected _children: string[];
    protected _name: string;

    constructor(name: string, info: BioLinkBase) {
        this._name = name;
        this._description = info.description;
        this._parent = info.is_a;
        this._children = [];
    }

    get parent(): string {
        return this._parent;
    }

    get description(): string {
        return this._description;
    }

    get name(): string {
        return this._name;
    }

    get children(): string[] {
        return this._children;
    }

    abstract addChild(child: string): void;
}
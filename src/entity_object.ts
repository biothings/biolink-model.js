import { BioLinkClassObject, BioLinkEntityObject } from './types/types';
import { pascalCase } from 'pascal-case';

export default class Entity implements BioLinkEntityObject {
  private _description: string;
  private _parent: string;
  private _children: string[];
  private _ancestors: Entity[];
  private _descendants: Entity[];
  private _id_prefixes: string[];
  private _name: string;

  constructor(name: string, info: BioLinkClassObject) {
    this._name = name;
    this._description = info.description;
    this._id_prefixes = info.id_prefixes;
    this._parent = typeof info.is_a === 'undefined' ? info.is_a : pascalCase(info.is_a);
    this._children = [];
  }

  get parent(): string {
    return this._parent;
  }

  get description(): string {
    return this._description;
  }

  get id_prefixes(): string[] {
    return this._id_prefixes;
  }

  get name(): string {
    return this._name;
  }

  get children(): string[] {
    return this._children;
  }

  addChild(child: string): void {
    this._children.push(pascalCase(child));
  }
}

import Entity from './entity_object';
import { pascalCase } from 'pascal-case';
import {
  BioLinkClassesObject,
  BioLinkEntityObject,
  BioLinkEntitiesObject,
  BioLinkClassTreeObject,
} from './types/types';
import EntityNotFound from './exceptions/entity_not_found';

export default class BioLinkClassTree implements BioLinkClassTreeObject {
  private _objects: BioLinkClassesObject;
  private _entities: BioLinkEntitiesObject;

  constructor(objects: BioLinkClassesObject) {
    this._objects = objects;
    this._entities = {};
  }

  get objects(): BioLinkClassesObject {
    return this._objects;
  }

  get entities(): BioLinkEntitiesObject {
    return this._entities;
  }

  private getUniqueEntities(entities: BioLinkEntityObject[]): BioLinkEntityObject[] {
    const entityObjs = {};
    entities.map((entity) => {
      entityObjs[entity.name] = entity;
    });
    return Object.values(entityObjs);
  }

  construct(): void {
    this._entities = {};
    Object.keys(this._objects).map((name) => {
      this._entities[pascalCase(name)] = new Entity(pascalCase(name), this._objects[name]);
    });
    Object.keys(this._objects).map((name) => {
      if ('is_a' in this._objects[name]) {
        this._entities[pascalCase(this._objects[name].is_a)].addChild(name);
      }
    });
  }

  getDescendants(name: string): BioLinkEntityObject[] {
    if (!(pascalCase(name) in this._entities)) {
      throw new EntityNotFound(`Your input entity ${pascalCase(name)} is not in the tree.`);
    }
    let descendants = [];
    this._entities[pascalCase(name)].children.map((child) => {
      descendants.push(this._entities[child]);
      descendants = [...descendants, ...this.getDescendants(child)];
    });
    return this.getUniqueEntities(descendants);
  }

  getAncestors(name: string): BioLinkEntityObject[] {
    if (!(pascalCase(name) in this._entities)) {
      throw new EntityNotFound(`Your input entity ${pascalCase(name)} is not in the tree.`);
    }
    let ancestors = [];
    if (typeof this._entities[pascalCase(name)].parent === 'undefined') {
      return ancestors;
    }
    ancestors.push(this._entities[this._entities[pascalCase(name)].parent]);
    ancestors = [...ancestors, ...this.getAncestors(this._entities[pascalCase(name)].parent)];
    return this.getUniqueEntities(ancestors);
  }

  getPath(downstreamNode: string, upstreamNode: string): BioLinkEntityObject[] {
    if (!(pascalCase(downstreamNode) in this._entities)) {
      throw new EntityNotFound(`Your downstream entity ${pascalCase(downstreamNode)} is not in the tree.`);
    }
    if (!(pascalCase(upstreamNode) in this._entities)) {
      throw new EntityNotFound(`Your upstream entity ${pascalCase(upstreamNode)} is not in the tree.`);
    }
    let path = [];
    if (
      typeof this._entities[pascalCase(downstreamNode)].parent === 'undefined' ||
      this._entities[pascalCase(downstreamNode)].parent === pascalCase(upstreamNode)
    ) {
      return path;
    }
    path.push(this._entities[this._entities[pascalCase(downstreamNode)].parent]);
    path = [...path, ...this.getPath(this._entities[pascalCase(downstreamNode)].parent, upstreamNode)];
    return this.getUniqueEntities(path);
  }
}

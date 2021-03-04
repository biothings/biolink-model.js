import Slot from '../object/slot_object';
import { underscore } from '../utils';
import { BioLinkSlots, BioLinkSlotObject, BioLinkSlotsObject, BioLinkSlotTreeObject } from '../types/types';
import BaseTree from './base_tree';

export default class BioLinkClassTree extends BaseTree implements BioLinkSlotTreeObject {
  protected _objects_in_yaml: BioLinkSlots;
  protected _objects_in_tree: BioLinkSlotsObject;

  constructor(objects: BioLinkSlots) {
    super(objects);
    this._modify = underscore;
  }

  get objects(): BioLinkSlotsObject {
    return this._objects_in_tree;
  }

  protected addNewObjectToTree(name: string): void {
    this._objects_in_tree[this._modify(name)] = new Slot(this._modify(name), this._objects_in_yaml[name]);
  }

  getDescendants(name: string): BioLinkSlotObject[] {
    return super.getDescendants(name) as BioLinkSlotObject[];
  }

  getAncestors(name: string): BioLinkSlotObject[] {
    return super.getAncestors(name) as BioLinkSlotObject[];
  }

  getPath(downstreamNode: string, upstreamNode: string): BioLinkSlotObject[] {
    return super.getPath(downstreamNode, upstreamNode) as BioLinkSlotObject[];
  }
}

import loader from './loader/loader_factory';
import syncLoader from './loader/sync_loader_factory';
import BioLinkClassTree from './tree/class_tree';
import BioLinkSlotTree from './tree/slot_tree';
import { BioLinkJSON, BioLinkClassTreeObject, BioLinkModule, BioLinkSlotTreeObject } from './types/types';

export class BioLink implements BioLinkModule {
  private _biolink_json: BioLinkJSON;
  private _biolink_class_tree: BioLinkClassTreeObject;
  private _biolink_slot_tree: BioLinkSlotTreeObject;

  constructor() {
    this._biolink_json = {} as BioLinkJSON;
  }

  async load(source: string = undefined) {
    const l = loader(source);
    this._biolink_json = await l.load(source);
    this._biolink_class_tree = new BioLinkClassTree(this._biolink_json.classes);
    this._biolink_slot_tree = new BioLinkSlotTree(this._biolink_json.slots);
    this._biolink_class_tree.construct();
    this._biolink_slot_tree.construct();
  }

  loadSync(source: string = undefined) {
    const l = syncLoader(source);
    this._biolink_json = l.load(source);
    this._biolink_class_tree = new BioLinkClassTree(this._biolink_json.classes);
    this._biolink_slot_tree = new BioLinkSlotTree(this._biolink_json.slots);
    this._biolink_class_tree.construct();
    this._biolink_slot_tree.construct();
  }

  get classTree() {
    return this._biolink_class_tree;
  }

  get slotTree() {
    return this._biolink_slot_tree;
  }

  get biolinkJSON() {
    return this._biolink_json;
  }
}

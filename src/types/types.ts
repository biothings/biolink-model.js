export interface BioLinkBase {
  is_a?: string;
  description?: string;
  [propName: string]: any;
}

export interface BioLinkClass extends BioLinkBase {
  id_prefixes?: string[];
  exact_mapping?: string[];
  slots?: string[];
}

export interface BioLinkBaseObject {
  [propName: string]: BioLinkBase;
}

export interface BioLinkClassesObject {
  [propName: string]: BioLinkClass;
}

export interface BioLinkObject {
  parent: string;
  children: string[];
  description: string;
  name: string;
  addChild(child: string): void;
}

export interface BioLinkObjects {
  [propName: string]: BioLinkObject
}

export interface BioLinkEntityObject extends BioLinkObject {
  id_prefixes: string[];
}

export interface BioLinkSlotObject extends BioLinkObject {
  domain: string;
  range: string;
  exact_mapping: string[];
  close_mapping: string[];
  narrow_mapping: string[];
}

export interface BioLinkEntitiesObject {
  [propName: string]: BioLinkEntityObject;
}

export interface BioLinkSlotsObject {
  [propName: string]: BioLinkSlotObject;
}

export interface BioLinkSlot extends BioLinkBase {
  domain?: string;
  range?: string;
  exact_mapping?: string[];
  close_mapping?: string[];
  narrow_mapping?: string[];
  [propName: string]: any;
}

export interface BioLinkSlots {
  [propName: string]: BioLinkSlot;
}

export interface BioLinkJSON {
  classes: BioLinkClassesObject;
  slots: BioLinkSlots;
  [propName: string]: any;
}

export interface BaseTreeObject {
  objects: BioLinkObjects;
  construct(): void;
  getDescendants(name: string): BioLinkObject[];
  getAncestors(name: string): BioLinkObject[];
  getPath(downstreamNode: string, upstreamNode: string): BioLinkObject[];
}

export interface BioLinkClassTreeObject extends BaseTreeObject {
  objects: BioLinkEntitiesObject;
  getDescendants(name: string): BioLinkEntityObject[];
  getAncestors(name: string): BioLinkEntityObject[];
  getPath(downstreamNode: string, upstreamNode: string): BioLinkEntityObject[];
}

export interface BioLinkSlotTreeObject extends BaseTreeObject {
  objects: BioLinkSlotsObject;
  getDescendants(name: string): BioLinkSlotObject[];
  getAncestors(name: string): BioLinkSlotObject[];
  getPath(downstreamNode: string, upstreamNode: string): BioLinkSlotObject[];
}

export interface LoaderClass {
  load(input: string | undefined): Promise<BioLinkJSON> | BioLinkJSON;
}

export interface BioLinkModule {
  load(source: string | undefined): void;
  loadSync(source: string | undefined): void;
  classTree: BioLinkClassTreeObject;
  slotTree: BioLinkSlotTreeObject;
  biolinkJSON: BioLinkJSON;
}

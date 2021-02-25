export interface BioLinkClassObject {
    is_a: string,
    description?: string,
    id_prefixes?: string[],
    exact_mapping?: string[],
    slots?: string[],
    [propName: string]: any
}

export interface BioLinkClassesObject {
    [propName: string]: BioLinkClassObject;
}

export interface BioLinkEntityObject {
    parent: string;
    children: string[];
    description: string;
    id_prefixes: string[];
    name: string;
    addChild(child: string): void;
}

export interface BioLinkEntitiesObject {
    [propName: string]: BioLinkEntityObject
}

interface BioLinkSlotObject {
    description?: string,
    domain?: string,
    range?: string,
    exact_mapping?: string[],
    close_mapping?: string[],
    narrow_mapping?: string[],
    [propName: string]: any
}

interface BioLinkSlotsObject {
    [propName: string]: BioLinkSlotObject;
}

export interface BioLinkJSON {
    classes: BioLinkClassesObject,
    slots: BioLinkSlotsObject,
    [propName: string]: any
}

export interface BioLinkClassTreeObject {
    entities: BioLinkEntitiesObject,
    objects: BioLinkClassesObject,
    construct(): void;
    getDescendants(name: string): BioLinkEntityObject[];
    getAncestors(name: string): BioLinkEntityObject[];
}

export interface LoaderClass {
    load(input: string | undefined): Promise<BioLinkJSON>;
}
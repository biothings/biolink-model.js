interface BioLinkClassObject {
    description?: string,
    id_prefixes?: string[],
    exact_mapping?: string[],
    slots?: string[],
    [propName: string]: any
}

interface BioLinkClassesObject {
    [propName: string]: BioLinkClassObject;
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
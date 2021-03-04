import { BioLinkSlot, BioLinkSlotObject } from '../types/types';
import { underscore } from '../utils';
import BaseObject from './base_object';

export default class Slot extends BaseObject implements BioLinkSlotObject {
    private _domain: string;
    private _range: string;
    private _exact_mapping: string[];
    private _close_mapping: string[];
    private _narrow_mapping: string[];

    constructor(name: string, info: BioLinkSlot) {
        super(name, info);
        this._parent = typeof info.is_a === 'undefined' ? info.is_a : underscore(info.is_a);
        this._exact_mapping = info.exact_mapping;
        this._close_mapping = info.close_mapping;
        this._narrow_mapping = info.narrow_mapping;
    }

    get domain(): string {
        return this._domain;
    }

    get range(): string {
        return this._range;
    }

    get exact_mapping(): string[] {
        return this._exact_mapping;
    }

    get narrow_mapping(): string[] {
        return this._narrow_mapping;
    }

    get close_mapping(): string[] {
        return this._close_mapping;
    }

    addChild(child: string): void {
        this._children.push(underscore(child));
    }
}

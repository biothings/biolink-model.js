import { underscore } from '../../src/utils';

describe("Test utils module", () => {
    test("underscore(affects abundance of) should return affects_abundance_of", () => {
        const res = underscore("affects abundance of");
        expect(res).toEqual("affects_abundance_of");
    })

    test("underscore(undefined) should return undefined", () => {
        const res = underscore(undefined);
        expect(res).toBeUndefined
    })
})
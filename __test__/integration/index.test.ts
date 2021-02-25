import { BioLink } from '../../src/index';
import BioLinkClassTree from '../../src/class_tree';

describe("Test BioLink module", () => {
    describe("Test load function", () => {
        test("When source is unspecified, should return default spec", async () => {
            const biolink = new BioLink();
            await biolink.load();
            expect(biolink.biolinkJSON).toHaveProperty("classes");
        })
    })

    describe("Test classTree getter method", () => {
        test("BioLink Class Tree Object is correctly retrieved", async () => {
            const biolink = new BioLink();
            await biolink.load();
            expect(biolink.classTree).toBeInstanceOf(BioLinkClassTree);
            expect(biolink.classTree.entities).toHaveProperty("Gene");
        })
    })
})
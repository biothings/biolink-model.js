import BioLinkSlotTree from '../../src/tree/slot_tree';
import SlotObject from '../../src/object/slot_object';
import NodeNotFound from '../../src/exceptions/node_not_found'
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { BioLinkJSON } from '../../src/types/types'

describe("Test BioLink Slot Tree class", () => {
    describe("Test construct function", () => {
        let tree;
        let objs;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            objs = jsonObj.slots;
            tree = new BioLinkSlotTree(objs);
        })

        test("Test all objects are corretly loaded", () => {
            tree.construct();
            expect(tree.objects).toHaveProperty("negatively_regulates");
            expect(tree.objects.negatively_regulates).toBeInstanceOf(SlotObject);
            expect(tree.objects).toHaveProperty("positively_regulates");
            expect(tree.objects).toHaveProperty("disrupts");
            expect(Object.keys(tree.objects)).toHaveLength(Object.keys(objs).length);
        })

        test("Test hierarchical order are correctly parsed", () => {
            tree.construct();
            expect(tree.objects.regulates.children).toContain('negatively_regulates');
            expect(tree.objects.affected_by.children).toContain('disrupted_by');
            expect(tree.objects.affected_by.children).not.toContain('negatively_regulates');
            expect(tree.objects.negatively_regulates.children).toHaveLength(0);
        })

        test("Test non-explicit inverses are correctly inferred", () => {
            tree.construct();
            expect(tree.objects.gene_associated_with_condition.inverse).toEqual("condition_associated_with_gene");
            expect(tree.objects.approved_to_treat.inverse).toEqual("approved_for_treatment_by");
            expect(tree.objects.catalyzes.inverse).toEqual('has_catalyst');
        })
    })

    describe("Test getDescendants function", () => {
        let tree;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            const objs = jsonObj.slots;
            tree = new BioLinkSlotTree(objs);
            tree.construct();
        })

        test("Test multi-level inheritency is correctly parsed", () => {
            expect(tree.getDescendants("related_to")).toContain(tree.objects.superclass_of);
            expect(tree.getDescendants("superclass_of")).not.toContain(tree.objects.related_to);
        })

        test("Entity without descendants should return empty array", () => {
            expect(tree.getDescendants("negatively_regulates")).toHaveLength(0);
            expect(tree.getDescendants('superclass_of')).toHaveLength(0);
        })

        test("Entity not in the tree should throw an error", () => {
            expect(() => {
                tree.getDescendants("Gene1");
            }).toThrowError(new NodeNotFound("The node you provide Gene1 is not in the tree."))
        })

    })

    describe("Test getAncestors function", () => {
        let tree;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            const objs = jsonObj.slots;
            tree = new BioLinkSlotTree(objs);
            tree.construct();
        })

        test("Test multi-level inheritency is correctly parsed", () => {
            tree.construct();
            expect(tree.getAncestors("affects_abundance_of")).toContain(tree.objects.related_to);
            expect(tree.getAncestors("affects_abundance_of")).toContain(tree.objects.affects);
            expect(tree.getAncestors("affects_abundance_of")).not.toContain(tree.objects.negatively_regulates);
        })

        test("Entity without ancestors should return empty array", () => {
            expect(tree.getAncestors("related_to")).toHaveLength(0);
            expect(tree.getAncestors('regulates')).toHaveLength(0);
        })

        test("Entity not in the tree should throw an error", () => {
            expect(() => {
                tree.getAncestors("regulates1");
            }).toThrowError(new NodeNotFound("The node you provide regulates1 is not in the tree."))
        })

    })

    describe("Test getPath function", () => {
        let tree;
        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            const objs = jsonObj.slots;
            tree = new BioLinkSlotTree(objs);
            tree.construct();
        })

        test("Return all intermediates nodes between upstream and downstream if there're > 1 intermediates", () => {
            const res = tree.getPath("disrupts", "related_to").map(item => item.name);
            expect(res).toEqual(["affects"]);
        })

        test("Return the intermediate nodes between upstream and downstream if there're only 1 intermediates", () => {
            const res = tree.getPath("disrupts", "related_to").map(item => item.name);
            expect(res).toEqual(["affects"]);
        })

        test("Return [] if upstream is direct parent of downstream", () => {
            const res = tree.getPath("disrupts", "affects").map(item => item.name);
            expect(res).toEqual([]);
        })

        test("Return [] if downstream has no parent", () => {
            const res = tree.getPath("related_to", "affects").map(item => item.name);
            expect(res).toEqual([]);
        })

        test("Downstream node not in the tree should throw an error", () => {
            expect(() => {
                tree.getPath("affects1", "affects2");
            }).toThrowError(new NodeNotFound("The node you provide affects1 is not in the tree."))
        })

        test("Upstream node not in the tree should throw an error", () => {
            expect(() => {
                tree.getPath("affects", "affects2");
            }).toThrowError(new NodeNotFound("The node you provide affects2 is not in the tree."))
        })
    })
})

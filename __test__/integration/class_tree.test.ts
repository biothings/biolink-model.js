import BioLinkClassTree from '../../src/class_tree';
import EntityObject from '../../src/entity_object';
import EntityNotFound from '../../src/exceptions/entity_not_found'
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { BioLinkJSON } from '../../src/types/types'

describe("Test BioLink Class Tree class", () => {
    describe("Test construct function", () => {
        let tree;
        let objs;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            objs = jsonObj.classes;
            tree = new BioLinkClassTree(objs);
        })

        test("Test all objects are corretly loaded", () => {
            tree.construct();
            expect(tree.entities).toHaveProperty("Gene");
            expect(tree.entities.Gene).toBeInstanceOf(EntityObject)
            expect(tree.entities).toHaveProperty("ChemicalSubstance");
            expect(tree.entities).toHaveProperty("OntologyClass");
            expect(Object.keys(tree.entities)).toHaveLength(Object.keys(objs).length);
        })

        test("Test hierarchical order are correctly parsed", () => {
            tree.construct();
            expect(tree.entities.GenomicEntity.children).toContain('Gene');
            expect(tree.entities.MolecularEntity.children).toContain('GenomicEntity');
            expect(tree.entities.MolecularEntity.children).not.toContain('Gene')
            expect(tree.entities.Gene.children).toHaveLength(0);
        })
    })

    describe("Test getDescendants function", () => {
        let tree;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            const objs = jsonObj.classes;
            tree = new BioLinkClassTree(objs);
            tree.construct();
        })

        test("Test multi-level inheritency is correctly parsed", () => {
            expect(tree.getDescendants("MolecularEntity")).toContain(tree.entities.Gene);
            expect(tree.entities.NamedThing).not.toBeUndefined;
            expect(tree.getDescendants("MolecularEntity")).not.toContain(tree.entities.NamedThing);
        })

        test("Entity without descendants should return empty array", () => {
            expect(tree.getDescendants("Gene")).toHaveLength(0);
            expect(tree.getDescendants('ProteinIsoform')).toHaveLength(0);
        })

        test("Entity not in the tree should throw an error", () => {
            expect(() => {
                tree.getDescendants("Gene1");
            }).toThrowError(new EntityNotFound("Your input entity Gene1 is not in the tree."))
        })

    })

    describe("Test getAncestors function", () => {
        let tree;

        beforeEach(() => {
            const file = fs.readFileSync(path.resolve(__dirname, '../../data/biolink.yaml'), { encoding: 'utf8' });
            const jsonObj = yaml.load(file) as BioLinkJSON;
            const objs = jsonObj.classes;
            tree = new BioLinkClassTree(objs);
            tree.construct();
        })

        test("Test multi-level inheritency is correctly parsed", () => {
            tree.construct();
            expect(tree.getAncestors("Gene")).toContain(tree.entities.MolecularEntity);
            expect(tree.getAncestors("Gene")).toContain(tree.entities.NamedThing);
            expect(tree.getAncestors("Gene")).not.toContain(tree.entities.Protein);
        })

        test("Entity without ancestors should return empty array", () => {
            expect(tree.getAncestors("Entity")).toHaveLength(0);
            expect(tree.getAncestors('Annotation')).toHaveLength(0);
        })

        test("Entity not in the tree should throw an error", () => {
            expect(() => {
                tree.getAncestors("Gene1");
            }).toThrowError(new EntityNotFound("Your input entity Gene1 is not in the tree."))
        })

    })
})
import Entity from '../../src/entity_object';

describe("Test EntityObject class", () => {
    test("If input entity is Gene, should add additonal ID prefixes in addtion to provided ones", () => {
        const entity = new Entity("Gene", {
            "id_prefixes": ["NCBIGENE"]
        })
        expect(entity.id_prefixes).toContain("NCBIGENE");
        expect(entity.id_prefixes).toContain("UMLS");
        expect(entity.id_prefixes).toContain("SYMBOL");
        expect(entity.id_prefixes).toContain("OMIM");
    })

    test("If input entity is ChemicalSubstance, should add additonal ID prefixes in addtion to provided ones", () => {
        const entity = new Entity("ChemicalSubstance", {
            "id_prefixes": ["CHEMBL.COMPOUND"]
        })
        expect(entity.id_prefixes).toContain("CHEMBL.COMPOUND");
        expect(entity.id_prefixes).toContain("UMLS");
    })

    test("If input entity is not Gene or ChemicalSubstance, should just return provided ones", () => {
        const entity = new Entity("Disease", {
            "id_prefixes": ["KEGG"]
        })
        expect(entity.id_prefixes).toHaveLength(1);
        expect(entity.id_prefixes).toContain("KEGG");
    })
})
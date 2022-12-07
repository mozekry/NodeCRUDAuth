import {MythicalWeaponsStore } from '../models/mythical_weapons';

const store = new MythicalWeaponsStore();

describe('Mythical Weapons Model', () => {
    it('Should have an index Method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should resturn a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});

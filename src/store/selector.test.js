import { getAdvertsData
    , getAdvertsLoaded
    , getAdvertDetail
    , deleteAdvert
    , getTags
    , getTagsLoaded
 } from './selectors';

describe('TAGS', () => { 
    test('getTags', () => {
        const data = [
            {name: 'tag1', id: '1' },
            {name: 'tag2', id: '2' }];
        const state = {tags: {data}};
        const result = getTags(state);
        expect(result.length).toBe(2);
        
    });

    test('getTagsLoaded', () => {
        const state = {tags: {loaded: false}};
        const result = getTagsLoaded(state);
        expect(result).toBe(false);
    });
});


describe('ADVERTS', () => {
    describe('getAdvertsData', () => {
        const data = [
            {createdAt: '1', id: 'a' },
            {createdAt: '2', id: 'b' }];
        test(' should returns adverts sorted by createdAt desc', () => {
            const state = {adverts: {data} };
            const result = getAdvertsData(state);
            expect(result[0].id).toBe('b');
        });

        test(' should returns  all adverts', () => {
            const state = {adverts: {data} };
            const result = getAdvertsData(state);
            expect(result).toHaveLength(data.length);
        });        
    })

    describe('getAdvertsLoaded', () => {
                test(' should returns if adverts is loaded', () => {
            const state = {adverts: {loaded: false} };
            const result = getAdvertsLoaded(state);
            expect(result).toBe(false);
        });     
    })

    describe('getAdvertDetail', () => {
        test(' should returns advert detail', () => {
            const data = [
                {createdAt: '1', id: 'a' },
                {createdAt: '2', id: 'b' }];
            const state = {adverts: {data} };
            const result = getAdvertDetail(state, 'b');
            expect(result.createdAt).toBe('2');
        });     

    })

    describe('deleteAdvert', () => {
        test(' should returns adverts whitout item deleted', () => {
            const data = [
                {createdAt: '1', id: 'a' },
                {createdAt: '2', id: 'b' }];
            const state = {adverts: {data} };
            const result = deleteAdvert(state, 'b');
            expect(result.length).toBe(1);
        });     
    });
});



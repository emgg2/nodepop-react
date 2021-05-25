export const getIsLogged = state => state.auth;

export const getAdvertsData = state => 
    state.adverts.data.sort((t1,t2) => {
        if(t1.createdAt < t2.createdAt) return 1;
        return -1;
    })
export const getAdvertsLoaded = state => state.adverts.loaded;

export const getAdverts = state => state.advert;
export const getAdvertDetail = (state, advertId) => state.adverts.data.find(advert => advert.id === advertId);

export const getUi = state => state.ui;

export const getTags = state => state.tags.data;
export const getTagsLoaded = state => state.tags.loaded;




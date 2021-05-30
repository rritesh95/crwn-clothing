import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats : 1,
//     sneakers : 2,
//     jackets : 3,
//     womens : 4,
//     mens : 5
// };
//"Data Normalization" is a technique which says instead of storing large amount of list in
//an array, store it in an object, it will make searching faster in case we have to find
//an individual element from it as it does not not have to traverse unlike array and
//just look for property, it does not matter its first or last element

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectioUrlParam =>
createSelector(
    [selectCollections],
    //collections => collections.find( collection => collection.id === COLLECTION_ID_MAP[collectioUrlParam])
    collections => collections[collectioUrlParam]
)

//to memoize "selectCollection" we can use lodash.memoize, import lodash.memoize and
// wrap "selectCollection" in memoize like memoize( collectioUrlParam =>
//createSelector(
//    [selectCollections],
//    collections => collections.find( collection => collection.id === COLLECTION_ID_MAP[collectioUrlParam])
//))
//to install lodash use command "npm install lodash.memoize" 

//memoize does the same idea of memoization as reselect does for our selectors, 
//except it memoizing the return of our function which returns our selector

//currently not using memoization as "collectioUrlParam" is coming from mapStateToProps from
//wrapper component and dynamic in nature
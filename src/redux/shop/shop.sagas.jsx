import { takeEvery, call, put } from "@redux-saga/core/effects";

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from "./shop.types";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.action';

export function* fetchCollectionAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }

    //"call" is the code/effect that used to invoke functions inside generator functions
    //inside generator function to dispatch any actions we can't use "dispatch",
    //"put" is the code/effect to dispatch redux actions
}

export function* fetchCollectionStart(){
    yield takeEvery(    //check every actions that are coming in and check for "FETCH_COLLECTIONS_START"
                        // to call another generator
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}
import SHOP_DATA from './shop.data.js';
import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections : SHOP_DATA
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.payload){
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return{
                ...state,
                collections : action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;
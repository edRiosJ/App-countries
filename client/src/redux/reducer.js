import {GET_ALL_COUNTRIES, GET_COUNTRIES_NAME, SET_FILTERS, GET_COUNTRIES_ORDER} from './actions.js';

const initialState =
{
    listCountries: [],
    filters: []
}

export default function reducer(state = initialState, action)
{
    switch(action.type)
    {
        case GET_ALL_COUNTRIES: return {
                                    ...state,
                                    listCountries: action.payload,
                                    filters: action.payload
                                };
        case GET_COUNTRIES_NAME: return {...state, filters: action.payload};
        case SET_FILTERS: return {
                                ...state,
                                filters: action.payload
                            };
        case GET_COUNTRIES_ORDER: return{
                                        ...state,
                                        filters: action.payload
                                    }
        default: return {...state};
    }
}
export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRIES_NAME = 'GET_COUNTRIES_NAME';
export const SET_FILTERS = 'SET_FILTERS';
export const GET_COUNTRIES_ORDER = 'GET_COUNTRIES_ORDER';
require('dotenv').config();

const URL = process.env.REACT_APP_URL === 'production' ? 'https://app--countries.herokuapp.com' : 'http://localhost:3001';

export function getAllCountries()
{
    return (dispatch) =>
    {
        return fetch(`${URL}/countries/`)
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ALL_COUNTRIES, payload: data}));
    }
}

export function getCountriesName(name)
{
    return (dispatch) =>
    {
        return fetch(`${URL}/countries/?name=${name}`)
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_COUNTRIES_NAME, payload: data}));
    }
}

export function setFilters(filter)
{
    return {type: SET_FILTERS, payload: filter};
}

export function getCountriesOrder(order)
{
    return (dispatch) =>
    {
        return fetch(`${URL}/countries/order/?order=${order}`)
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_COUNTRIES_ORDER, payload: data}));
    }
}

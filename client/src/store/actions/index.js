import axios from 'axios'

export const GET_DOG = 'GET_DOG'
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT'
export const FILTER_DOG = 'FILTER_DOG'
export const ORDER_DOG = 'ORDER_DOG'
export const SEARCH_DOG = 'SEARCH_DOG'
export const POST_DOG = 'POST_DOG'
export const WEIGHT_DOG = 'WEIGHT_DOG'
export const GET_BY_ID = 'GET_BY_ID'

export const getDog = () => dispatch => {
    return axios.get('http://localhost:3001/dog')
        .then(dogs => {
            dispatch({
                type: GET_DOG,
                payload: dogs,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

export const getTemperament = () => dispatch => {
    return axios.get('http://localhost:3001/temperament')
        .then(temp => {
            dispatch({
                type: GET_TEMPERAMENT,
                payload: temp,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


export const postDog = (payload) => dispatch => {
    return axios.post('http://localhost:3001/dog', payload)
        .then(dog => {
            dispatch({
                type: POST_DOG,
                payload: dog,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


export const filterDogs = (payload) => {
    return ({
        type: FILTER_DOG,
        payload
    })
}

export const orderByName = (payload) => {
    return ({
        type: ORDER_DOG,
        payload
    })
}

export const orderByWeight = (payload) => {
    return ({
        type: WEIGHT_DOG,
        payload
    })
}

export const searchDog = (payload) => dispatch => {
    return axios.get('http://localhost:3001/dog/search?name=' + payload)
        .then(dog => {
            dispatch({
                type: SEARCH_DOG,
                payload: dog,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}


export const getById = (payload) => dispatch => {
    return axios.get('http://localhost:3001/dog/' + payload)
        .then(dogs => {
            dispatch({
                type: GET_BY_ID,
                payload: dogs,
            })
        })
        .catch((error) => {
            console.log(error);
        })
}
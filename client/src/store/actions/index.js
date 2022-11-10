import axios from 'axios'

export const GET_DOG = 'GET_DOG'

export const getDog = () => dispatch => {
    return axios.get('http://localhost:3001/dog')
    .then (dogs => {
        dispatch ({
            type: GET_DOG,
            payload: dogs,
        })
    })
    .catch((error) => {
        console.log(error);
    })
}
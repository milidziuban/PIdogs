import { GET_DOG } from "../actions"

const initialState = {
    dogs: [],
    allDogs: [],
    detailsDogs: [],
    temperaments: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOG:
            return {
                ...state,
                dogs: action.payload.data,
            }
        default:
            return state;

    }
}

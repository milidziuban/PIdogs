import { GET_DOG, FILTER_DOG, GET_TEMPERAMENT, ORDER_DOG, WEIGHT_DOG, SEARCH_DOG, POST_DOG, GET_BY_ID } from "../actions"

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detailsDogs: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case GET_DOG:
            return {
                ...state,
                dogs: action.payload.data,
                allDogs: action.payload.data,
            };

        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload.data,
            };

        case FILTER_DOG:
            const allDogs = state.allDogs;
            let filteredDogs = [];
            const statusFilter = action.payload;

            if (statusFilter === "All") {
                filteredDogs = allDogs;
            }

            else {
                for (let i = 0; i < allDogs.length; i++) {
                    let found = allDogs[i].temperament?.includes(statusFilter);
                    if (found) {
                        filteredDogs.push(allDogs[i]);
                    }
                }
            }

            return {
                ...state,
                dogs: filteredDogs,
            };

        case ORDER_DOG:

            const sortedName = action.payload === "A-Z" ? state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;                                                      //cambio de indices
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
                : state.dogs.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedName,
            };


        case WEIGHT_DOG:

            const dogweight = action.payload === 'min' ? state.dogs.sort((a, b) => {


                if ((a.weight) > (b.weight)) {
                    return 1;                      
                }
                if ((b.weight) > (a.weight)) {
                    return -1;
                }
                return 0;

            })
                : state.dogs.sort((a, b) => {
                    if ((a.weight) > (b.weight)) {
                        return -1;
                    }
                    if ((b.weight) > (a.weight)) {
                        return 1;
                    }
                    return 0;
                });

            return {
                ...state,
                dogs: dogweight,
            };

        case SEARCH_DOG:
            return {
                ...state,
                dogs: action.payload.data
            };

        case POST_DOG:
            return {
                ...state,
            };

        case GET_BY_ID:
            return {
                ...state,
                detailsDogs: action.payload.data
            };

        default:
            return state;

    }
}
import * as TYPES from '../actions/types';

const initialState = {
    str: {
        JSON: "",
        CSV: "",
    },
    isCorrect: {
        JSON: false,
        CSV: false,
    },
};

export default function (state = initialState, action) {

    const {type, str, format} = action;

    switch (type) {
        case TYPES.TEXT_IMPORTED_FROM_TABLE:
            return {
                ...state,
                str: {...state.str, [format]: str},
                isCorrect: {...state.isCorrect, [format]: true}
            };

        case TYPES.TEXT_EDITED:
            return {
                ...state,
                str: {...state.str, [format]: str},
                isCorrect: {...state.isCorrect, [format]: true}
            };

        case TYPES.TEXT_PARSE_FAILED:
            return {
                ...state,
                str: {...state.str, [format]: str},
                isCorrect: {...state.isCorrect, [format]: false}
            };

        default:
            return state;
    }
}

import * as TYPES from '../actions/types';

const initialState = {
    jsonStr: "",
    isCorrect: false
};

export default function (state = initialState, action) {

    const {type, str} = action;

    switch (type) {
        case TYPES.TEXT_IMPORTED_FROM_TABLE:
            return {
                ...state,
                jsonStr: str,
                isCorrect: true
            };

        case TYPES.TEXT_EDITED:
            return {
                ...state,
                jsonStr: str,
                isCorrect: true
            };

        case TYPES.TEXT_PARSE_FAILED:
            return {
                ...state,
                jsonStr: str,
                isCorrect: false
            };

        default:
            return state;
    }
}

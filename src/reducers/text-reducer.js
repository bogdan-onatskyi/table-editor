import {
    TEXT_LOADED_FROM_TABLE,
    TEXT_SAVED_TO_TABLE,
    TEXT_EDITED,
    TEXT_PARSE_FAILED,
} from '../actions/types';

const initialState = {
    jsonStr: "",
    isCorrect: false
};

export default function (state = initialState, action) {

    if (action.props === undefined) return state;

    const {str} = action.props;

    switch (action.type) {
        case TEXT_LOADED_FROM_TABLE:
            return {
                ...state,
                jsonStr: str,
                isCorrect: true
            };

        case TEXT_EDITED:
            return {
                ...state,
                jsonStr: str,
                isCorrect: true
            };

        case TEXT_PARSE_FAILED:
            return {
                ...state,
                jsonStr: str,
                isCorrect: false
            };

        default:
            return state;
    }
}

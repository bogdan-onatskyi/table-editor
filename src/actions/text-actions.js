import {
    TEXT_LOADED_FROM_TABLE,
    TEXT_SAVED_TO_TABLE,
    TEXT_EDITED,
    TEXT_PARSE_FAILED,
} from './types';

export function textLoadedFromTable({str}) {
    return {
        type: TEXT_LOADED_FROM_TABLE,
        props: {str}
    };
}

export function textSavedToTable({str}) {
    // todo fix
    return {
        type: TEXT_SAVED_TO_TABLE,
        props: {str}
    };
}

export function textEdited({str}) {
    return {
        type: TEXT_EDITED,
        props: {str}
    };
}

export function textParseFailed({str}) {
    return {
        type: TEXT_PARSE_FAILED,
        props: {str}
    };
}
import * as TYPES from './types';

export function rowEdited(i, name, value) {
    return {
        type: TYPES.ROW_EDITED,
        i, name, value
    };
}

export function rowInserted(i, name, value) {
    return {
        type: TYPES.ROW_INSERTED,
        i, name, value
    };
}

export function rowAppended(name, value) {
    return {
        type: TYPES.ROW_APPENDED,
        name, value
    };
}

export function rowDeleted(i) {
    return {
        type: TYPES.ROW_DELETED,
        i
    };
}

export function rowMovedUp(i) {
    return {
        type: TYPES.ROW_MOVED_UP,
        i
    };
}

export function rowMovedDown(i) {
    return {
        type: TYPES.ROW_MOVED_DOWN,
        i
    };
}

export function colSortedAsc(paramName) {
    return {
        type: TYPES.COL_SORTED_ASC,
        paramName
    };
}

export function colSortedDesc(paramName) {
    return {
        type: TYPES.COL_SORTED_DESC,
        paramName
    };
}
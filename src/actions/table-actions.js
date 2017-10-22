import {
    ROW_EDITED,
    ROW_INSERTED,
    ROW_APPENDED,
    ROW_DELETED,
    ROW_MOVED_UP,
    ROW_MOVED_DOWN
} from './types';

export function rowEdited({i, name, value}) {
    return {
        type: ROW_EDITED,
        props: {i, name, value}
    };
}

export function rowInserted({i, name, value}) {
    return {
        type: ROW_INSERTED,
        props: {i, name, value}
    };
}

export function rowAppended({name, value}) {
    return {
        type: ROW_APPENDED,
        props: {name, value}
    };
}

export function rowDeleted({i}) {
    return {
        type: ROW_DELETED,
        props: {i}
    };
}

export function rowMovedUp({i}) {
    return {
        type: ROW_MOVED_UP,
        props: {i}
    };
}

export function rowMovedDown({i}) {
    return {
        type: ROW_MOVED_DOWN,
        props: {i}
    };
}
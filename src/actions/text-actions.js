import * as TYPES from './types';

export function textImportedFromTable(str) {
    return {
        type: TYPES.TEXT_IMPORTED_FROM_TABLE,
        str
    };
}

export function textExportedToTable(data) {
    return {
        type: TYPES.TEXT_EXPORTED_TO_TABLE,
        data
    };
}
// todo fix
export function textImportedFromFile(str) {
    return {
        type: TYPES.TEXT_IMPORTED_FROM_FILE,
        str
    };
}

// todo fix
export function textExportedToFile(str) {
    return {
        type: TYPES.TEXT_EXPORTED_TO_FILE,
        str
    };
}

export function textEdited(str) {
    return {
        type: TYPES.TEXT_EDITED,
        str
    };
}

export function textParseFailed(str) {
    return {
        type: TYPES.TEXT_PARSE_FAILED,
        str
    };
}
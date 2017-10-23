import * as TYPES from '../actions/types';

const initialState = {
    data: [
        {name: "name1", value: "value1"},
        {name: "name2", value: "value2"},
        {name: "name3", value: "value3"},
        {name: "name4", value: "value4"},
    ]
};

export default function (state = initialState, action) {
    const {type, i, name, value, paramName} = action;

    switch (type) {
        case TYPES.ROW_EDITED:
            if (i < 0 || i > state.data.length - 1) return state;
            return {
                ...state,
                data: [...state.data.map((row, index) => {
                    if (index === i) {
                        row.name = name;
                        row.value = value;
                    }
                    return row;
                })]
            };

        case TYPES.ROW_INSERTED:
            if (i < 0 || i > state.data.length) return state;
            return {
                ...state,
                data: [
                    ...state.data.slice(0, i),
                    {name, value},
                    ...state.data.slice(i)
                ]
            };

        case TYPES.ROW_APPENDED:
            return {
                ...state,
                data: [...state.data, {name, value}]
            };

        case TYPES.ROW_DELETED:
            return {
                ...state,
                data: [...state.data.filter((_, index) => index !== i)]
            };

        case TYPES.ROW_MOVED_UP:
            if (i < 1 || i > state.data.length - 1) return state;
            return {
                ...state,
                data: [
                    ...state.data.slice(0, i - 1),
                    state.data[i],
                    state.data[i - 1],
                    ...state.data.slice(i + 1)
                ]
            };

        case TYPES.ROW_MOVED_DOWN:
            if (i < 0 || i > state.data.length - 2) return state;
            return {
                ...state,
                data: [
                    ...state.data.slice(0, i),
                    state.data[i + 1],
                    state.data[i],
                    ...state.data.slice(i + 2)
                ]
            };

        case TYPES.COL_SORTED_UP:
            return {
                ...state,
                data: [...state.data.sort((a, b) => a[paramName] > b[paramName] ? -1 : 1)]
            };

        case TYPES.COL_SORTED_DOWN:
            return {
                ...state,
                data: [...state.data.sort((a, b) => a[paramName] > b[paramName] ? 1 : -1)]
            };

        case TYPES.TEXT_EXPORTED_TO_TABLE:
            const {data} = action;
            return {
                ...state,
                data: [...data]
            };

        default:
            return state;
    }
}
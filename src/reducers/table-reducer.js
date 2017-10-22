import {
    ROW_EDITED,
    ROW_INSERTED,
    ROW_APPENDED,
    ROW_DELETED,
    ROW_MOVED_UP,
    ROW_MOVED_DOWN
} from '../actions/types';

const initialState = {
    title: "Заголовок таблицы",
    data: [
        {name: "name1", value: "value1"},
        {name: "name2", value: "value2"},
    ]
};

export default function (state = initialState, action) {

    if (action.props === undefined) return state;

    const {i, name, value} = action.props;

    switch (action.type) {
        case ROW_EDITED:
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

        case ROW_INSERTED:
            if (i < 0 || i > state.data.length) return state;
            return {
                ...state,
                data: [
                    ...state.data.slice(0, i),
                    {name, value},
                    ...state.data.slice(i)
                ]
            };

        case ROW_APPENDED:
            return {
                ...state,
                data: [...state.data, {name, value}]
            };

        case ROW_DELETED:
            return {
                ...state,
                data: [...state.data.filter((_, index) => index !== i)]
            };

        case ROW_MOVED_UP:
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
        case ROW_MOVED_DOWN:
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

        default:
            return state;
    }
}
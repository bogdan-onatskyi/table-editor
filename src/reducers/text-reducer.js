import {TEXT_EDITED} from '../actions/types';

const initialState = '';
// const initialState = '{"text":[{"name":"name1","value":"value11"},{"name":"name2","value":"value22"}]}';

export default function text(state = initialState, action) {

    switch (action.type) {
        // case TEXT_EDITED:
        //     return state;
        default:
            return state;
    }
}

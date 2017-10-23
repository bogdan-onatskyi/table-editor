import {combineReducers} from 'redux';

import table from './table-reducer';
import text from './text-reducer';

export default combineReducers({table, text});
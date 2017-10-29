import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/configure-store';
import TableEditor from './components/table-editor/table-editor';
import TextView from './components/text-view/text-view';

import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

import './app.scss';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <div className="container">
            <div className="row">
                <TableEditor />
            </div>
            <div className="row">
                <TextView />
            </div>
        </div>
    </Provider>
);

export default App;
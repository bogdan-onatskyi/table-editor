import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/configure-store';
import TableView from './components/table-view';
import TextView from './components/text-view';

const store = configureStore();

import 'jquery'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
// import 'material-design-icons'

const App = () => (
    <Provider store={store}>
        <div className="container">
            <TableView/>
            <TextView/>
        </div>
    </Provider>
);

export default App;
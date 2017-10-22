import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/configure-store';
import TableView from './components/table-view';
import TextView from './components/text-view';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <div>
            <TableView/>
            <TextView/>
        </div>
    </Provider>
);

export default App;
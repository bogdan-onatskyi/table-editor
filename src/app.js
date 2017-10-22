import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './store/configure-store';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <div>

        </div>
    </Provider>
);

export default App;
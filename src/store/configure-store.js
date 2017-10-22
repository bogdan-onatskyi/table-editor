import {createStore} from 'redux';
import rootReducer from '../reducers/root-reducer';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers/root-reducer', () => {
            const nextRootReducer = require('../reducers/root-reducer');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
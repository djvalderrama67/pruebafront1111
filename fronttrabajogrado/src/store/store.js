import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reduxCategories from '../reducers/reduxCategories';
import reduxObjects from '../reducers/reduxObjects';
import reduxCount from '../reducers/reduxCount';

const rootReducer = combineReducers({
    reduxCategories,
    reduxObjects,
    reduxCount,
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
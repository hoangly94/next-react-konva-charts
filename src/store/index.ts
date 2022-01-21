import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer,
    middleware
});

sagaMiddleware.run(saga);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>

export default store
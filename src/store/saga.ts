
import { all } from '@redux-saga/core/effects';
import chart from './modules/charts/Candlestick/saga'

export default function* rootSaga() {
    yield all([
        chart()
    ]);
  }
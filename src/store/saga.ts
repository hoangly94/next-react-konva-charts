
import { all } from '@redux-saga/core/effects';
import chart from './modules/chart/saga'

export default function* rootSaga() {
    yield all([
        chart()
    ]);
  }
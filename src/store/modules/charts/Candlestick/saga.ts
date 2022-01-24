
import { binanceAPi } from 'src/store/api';
import Service from 'src/store/service';
import { fetchData, setData } from "./slice"
import { takeLatest, put, select } from 'redux-saga/effects';
import { convertData, findMinMax, findXLabelRange } from './fn';
import { ICandlestickState } from './interface';

function* fetchDataSaga({ payload }) {
    const state: ICandlestickState = yield select(state => state.candlestick);
    const params = new URLSearchParams({
        symbol: state.symbol,
        interval: state.interval,
        limit: state.limit
    });

    const data = yield Service.get<string[][]>(binanceAPi.candlestickData, { params })
        .then(res => res.data.map(convertData))
        .catch(error => console.log(error));

    if (!data)
        return;

    const itemRange = {
        min: data.length - 5,
        max: data.length,
    };

    const shownData = data.slice(Math.ceil(itemRange.min), Math.floor(itemRange.max))

    const [min, max] = findMinMax(shownData);

    yield put(setData({
        data,
        itemRange,
        shownData,
        x: {
            // data: xAxisData,
        },
        y: {
            min: min,
            max: max,
        },
    }));
}


export default function* saga() {
    yield takeLatest(fetchData, fetchDataSaga);
}

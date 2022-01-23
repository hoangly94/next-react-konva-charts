
import { binanceAPi } from 'src/store/api';
import Service from 'src/store/service';
import { fetchData, setData } from "./slice"
import { takeLatest, put, select } from 'redux-saga/effects';
import { convertData, findMinMax } from './fn';
import { ICandlestickState } from './interface';

const timeGroup = [1];
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
        max: data.length - 1,
    };

    const shownData = data.slice(itemRange.min, itemRange.max + 1)

    const [min, max] = findMinMax(shownData);
    
    const shownDeltaTime = shownData[shownData.length-1].time - shownData[0].time;
    
    const xAxisData = 

    yield put(setData({
        data,
        itemRange,
        shownData,
        x: {
            min: 0,
            max: 0,
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
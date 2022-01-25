
import { binanceAPi } from '~store/api';
import Service from '~store/service';
import { fetchData, setData } from "./slice"
import { takeLatest, put, select } from 'redux-saga/effects';
import { convertData, convertXAxisLabelPosition, findMinMax, mapIntervalToLabelTimeType } from './fn';
import { IFilter } from '~interfaces';

function* fetchDataSaga() {
    const filter: IFilter = yield select(state => state.candlestick.filter);
    const params = new URLSearchParams({
        symbol: filter.symbol.value,
        interval: filter.interval.value,
        limit: '' + filter.limit.value
    });

    const data = yield Service.get<string[][]>(binanceAPi.candlestickData, { params })
        .then(res => res.data.map(convertData))
        .catch(error => console.log(error));

    if (!data) {
        return yield put(setData({
            data,
            itemRange: [],
            shownData: [],
            // xAxis:{
            //     data: xAxisData
            // },
        }));
    }

    const itemRange = {
        min: 0,
        max: data.length,
    };
    const shownData = data.slice(Math.ceil(itemRange.min), Math.floor(itemRange.max))
    // const [min, max] = findMinMax(shownData);

    yield put(setData({
        data,
        itemRange,
        shownData,
        // xAxis:{
        //     data: xAxisData
        // },
    }));
}


export default function* saga() {
    yield takeLatest(fetchData, fetchDataSaga);
}

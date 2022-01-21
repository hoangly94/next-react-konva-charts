
import { tickerAPi, tuVanCoPhieuAPI } from '~api';
import Service from '~service';
import { fetchTable, setPagination, setTable, setCodeFilterOptions, fetchCodeFilter } from "./slice"
import { takeLatest, put, select } from 'redux-saga/effects';
import { ICodeFilter, ITable } from '~interfaces';
import moment from 'moment';

const getState = (state) => state.tuVanCoPhieu;
const dateFormat = 'YYYY-MM-DD';

function* fetchCodeFilterSaga({ payload: { key } }) {
    const params = new URLSearchParams({sort: 'code,ASC'});
    // const params = new URLSearchParams({ limit: '10' });

    key && params.append('filter', `code||$starts||${key}`);
    const response = yield Service.get<ICodeFilter>(tickerAPi.base, { params })
        .catch(error => console.log(error));

    if (!response)
        return;
    yield put(setCodeFilterOptions(response.data));
}

function* fetchTableSaga({ payload: { page = '1', code, direction, timestamp } }) {
    const state = yield select(getState);
    const filtersState = state.filters;
    const limit = 12;
    const params = new URLSearchParams({ page, limit: '' + limit, sort: 'timestamp,DESC' });

    const codeFilterMapper = (code) => code.map(item => item.value).join(',');
    code
        && code !== 'all'
        && code.length
        && params.append('filter', `code||$in||${codeFilterMapper(code)}`);

    !code
        && filtersState.code.value
        && filtersState.code.value !== 'all'
        && filtersState.code.value.length
        && params.append('filter', `code||$in||${codeFilterMapper(filtersState.code.value)}`);

    timestamp
        && timestamp !== 'all'
        && (() => {
            params.append('filter', `timestamp||$gt||${moment(timestamp).toISOString()}`);
            params.append('filter', `timestamp||$lt||${moment(timestamp).add(1, 'd').toISOString()}`);
        })();
    !timestamp
        && filtersState.timestamp.value
        && filtersState.timestamp.value !== 'all'
        && (() => {
            params.append('filter', `timestamp||$gt||${moment(filtersState.timestamp.value).toISOString()}`);
            params.append('filter', `timestamp||$lt||${moment(filtersState.timestamp.value).add(1, 'd').toISOString()}`);
        })();

    const response = yield Service.get<ITable>(tuVanCoPhieuAPI.base, { params })
        .catch(error => console.log(error));

    if (!response)
        return;

    const directionMapper = {
        buy: 'Chiều mua',
        sell: 'Chiều bán',
        hold: 'Nắm giữ',
    }
    const tableData = response.data?.data?.map(v => (
        {
            ...v,
            direction: directionMapper[v.direction],
        }
    ));

    yield put(setTable(tableData));
    yield put(setPagination(response.data));
}


export default function* saga() {
    yield takeLatest(fetchTable, fetchTableSaga);
    yield takeLatest(fetchCodeFilter, fetchCodeFilterSaga);
}

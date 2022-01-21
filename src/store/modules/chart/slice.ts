
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { paginationState, paginationReducer } from '~store/utils';
import { ICodeFilter } from '~interfaces';

const tableAdapter = createEntityAdapter<{}>()

const initialState = {
  isLoading: false,
  filters: {
    code: {
      value: '',
      options: new Array<ICodeFilter>(),
      isLoading: false,
    },
    timestamp: {
      value: '',
    },
  },
  pagination: paginationState
};

const slice = createSlice({
  name: 'tuVanDauTu',
  initialState: tableAdapter.getInitialState(initialState),
  reducers: {
    fetchCodeFilter: (state, { payload }) => {
      state.filters.code.isLoading = true;
    },
    fetchTable: (state, { payload }) => {
      state.isLoading = true;
      state.pagination.page = payload.page
    },
    // setTable: tableAdapter.setAll,
    setTable: (state, action) => {
      tableAdapter.setAll(state, action);
      state.isLoading = false;
    },
    setCodeFilterOptions: (state, { payload }) => {
      state.filters.code.isLoading = false;
      state.filters.code.options = payload as any;
    },
    setCodeFilterValue: (state, { payload }) => {
      state.filters.code.value = payload.values;
    },
    setTimestampFilterValue: (state, { payload }) => {
      state.filters.timestamp.value = payload.value;
    },
    ...paginationReducer,
  }
})

export const { fetchCodeFilter, fetchTable, setTable, setPagination, clickPagination, setCodeFilterOptions, setCodeFilterValue, setTimestampFilterValue } = slice.actions
export default slice.reducer
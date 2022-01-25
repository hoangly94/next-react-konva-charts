
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { calculateZoomValue } from './fn';
import { TCandlestickData, ICandlestickState } from './interface';

const initialState: ICandlestickState = {
  isLoading: false,
  filter: {
    symbol: {
      value: 'SOLUSDT',
      isLoading: false
    },
    interval: {
      value: '5m',
      isLoading: false
    },
    limit: {
      value: 500,
      isLoading: false
    },
  },
  data: [],
  shownData: [],
  xAxis: {
    data: [],
    zoom: 1,
  },
  yAxis: {
    data: [],
    zoom: 1,
  },
  itemRange: {
    min: 0,
    max: 0,
  },
  zoom: {
    x: 1,
    y: 1,
  }
};

const slice = createSlice({
  name: 'candlestick',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.isLoading = true;
    },
    setData: (state, { payload: { data, itemRange, shownData } }) => {
      state.filter.symbol.isLoading = false;
      state.filter.interval.isLoading = false;
      state.filter.limit.isLoading = false;
      state.itemRange = itemRange;
      state.data = data;
      state.shownData = shownData;
      state.xAxis.data = [];
      state.yAxis.data = [];
      state.isLoading = false;
    },
    setCoordinatesXAxisData: (state, { payload }) => {
      state.xAxis.data = payload;
    },
    setCoordinatesYAxisData: (state, { payload }) => {
      state.yAxis.data = payload;
    },
    setSymbolFilter: (state, { payload }) => {
      state.filter.symbol = {
        value: payload,
        isLoading: true
      };
    },
    setIntervalFilter: (state, { payload }) => {
      state.filter.interval = {
        value: payload,
        isLoading: true
      };
    },
    setLimitFilter: (state, { payload }) => {
      state.filter.limit = {
        value: payload,
        isLoading: true
      };
    },
    setCoordinatesZoom: (state, { payload: { type, value } }) => {
      if (!type || type === 'x')
        state.xAxis.zoom = calculateZoomValue(state.xAxis.zoom, value);
      if (!type || type === 'y')
        state.yAxis.zoom = calculateZoomValue(state.yAxis.zoom, value);
    },
  }
})

export const {
  fetchData,
  setData,
  setSymbolFilter,
  setIntervalFilter,
  setLimitFilter,
  setCoordinatesXAxisData,
  setCoordinatesYAxisData,
  setCoordinatesZoom,
} = slice.actions

export default slice.reducer

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { TCandlestickData, ICandlestickState } from './interface';

const initialState: ICandlestickState = {
  isLoading: false,
  symbol: 'SOLUSDT',
  interval: '5m',
  limit: '10',
  data: [],
  shownData: [],
  itemRange: {
    min: 0,
    max: 0,
  },
  xAxis: {
  },
  yAxis: {
    min: 0,
    max: 0,
  },
  zoom: 100
};

const slice = createSlice({
  name: 'candlestick',
  initialState,
  reducers: {
    fetchData: (state, { payload }) => {
      state.isLoading = true;
    },
    setData: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isLoading: false
      }
    },
    setCoordinatesZoom: (state, { payload }) => {
      state.zoom = payload;
    },
  }
})

export const { fetchData, setData, setCoordinatesZoom } = slice.actions
export default slice.reducer
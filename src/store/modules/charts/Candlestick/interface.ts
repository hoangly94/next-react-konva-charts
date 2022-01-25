import { IFilter } from '~interfaces';

export interface ICandlestickState {
    isLoading: Boolean,
    filter: IFilter,
    data: TCandlestickData[],
    shownData: TCandlestickData[],
    itemRange: TItemRange,
    xAxis: IXAxis,
    yAxis: IYAxis,
    zoom: IZoom
}
export interface IXAxis {
    data: IXAxisData[],
    zoom: number,
}
export interface IXAxisData {
    x: number,
    centerPoint: number,
    data: number,
    text: string,
    width: number,
}

export interface IYAxis {
    data: IYAxisData[],
    zoom: number,
}

export interface IYAxisData {
    y: number,
    centerPoint: number,
    data: number,
    text: string,
    height: number,
}

export interface IZoom {
    x: number,
    y: number,
}

export type TCandlestickData = {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number,
}


export type TItemRange = {
    min: number,
    max: number,
};
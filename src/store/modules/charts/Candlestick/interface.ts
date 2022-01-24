export interface ICandlestickState {
    isLoading: Boolean,
    symbol: string,
    interval: TInterval,
    limit: string,
    data: TCandlestickData[],
    shownData: TCandlestickData[],
    itemRange: TItemRange,
    xAxis: {
        // data: .
    },
    yAxis: {
        min: number,
        max: number,
    },
    zoom: number,
}

export type TCandlestickData = {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number,
}



export type TInterval = '1m' | '5m' | '30m' | '1h' | '1d';
export type TItemRange = {
    min: number,
    max: number,
};
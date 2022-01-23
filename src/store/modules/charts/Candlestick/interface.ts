export interface ICandlestickState {
    isLoading: Boolean,
    symbol: string,
    interval: string,
    limit: string,
    data: TCandlestickData[],
    shownData: TCandlestickData[],
    itemRange: {
        min: number,
        max: number,
    },
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
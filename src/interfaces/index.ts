export interface IFilter {
    symbol: {
        value: string,
        isLoading: boolean
    },
    interval: {
        value: TInterval,
        isLoading: boolean
    },
    limit: {
        value: number,
        isLoading: boolean
    },
}

export type TInterval = '1m' | '5m' | '30m' | '1h' | '1d';
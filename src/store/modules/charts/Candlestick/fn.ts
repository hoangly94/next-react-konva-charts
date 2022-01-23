import moment from 'moment';
import { TCandlestickData } from './interface';
export const convertData = (array: string[]) => {
    const [time, open, high, low, close] = array;
    const result: TCandlestickData = {
        time: parseInt(time) / 1000,
        open: parseInt(open),
        high: parseInt(high),
        low: parseInt(low),
        close: parseInt(close)
    }
    return result
}

export const findMinMax = (array: TCandlestickData[]) => {
    return array.reduce(reduceMinMax, [array[0].high, 0]);
}

const reduceMinMax = (prev: number[], next: TCandlestickData) => {
    const [min, max] = prev;
    const { low, high } = next;
    return [
        [min, low][+(low < min)],
        [max, high][+(high > max)],
    ];
}



export const processAxisData = (array: TCandlestickData[]) => {
    return array.reduce(reduceMinMax, [array[0].high, 0]);
}

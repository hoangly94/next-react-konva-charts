import _ from 'lodash';
import moment from 'moment';
import { gcd } from 'src/utils';
import { TCandlestickData, TInterval, TItemRange } from './interface';
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
    return array.reduce(reduceMinMax, [array[0]?.high ?? 0, 0]);
}

const reduceMinMax = (prev: number[], next: TCandlestickData) => {
    const [min, max] = prev;
    const { low, high } = next;
    return [
        [min, low][+(low < min)],
        [max, high][+(high > max)],
    ];
}

export const findXLabelRange = (deltaRange: number, counter: number) => {
    let i = counter;
    do {
        if (deltaRange < i)
            continue;
        return gcd(deltaRange, i);
    } while (--i);

}

export const findXLabels = (shownData: TCandlestickData[], itemRange: TItemRange, interval: TInterval, amount: number) => {
    const deltaRange = Math.floor(itemRange.max) - Math.ceil(itemRange.min);
    const range = findXLabelRange(deltaRange, amount);
    const minPointDecimal = _.ceil(itemRange.min) - itemRange.min;
    const maxPointDecimal = itemRange.max % 1;

    const minPoint = Math.ceil(itemRange.min);
    const maxPoint = Math.floor(itemRange.max);

    const deltaTime = (deltaRange / range) * mapIntervalToTime(interval);

    if (!deltaTime)
        return [];
    const minTimeLabel = shownData[+!!minPointDecimal].time;

    const mainLabels = _.range(minPoint, maxPoint).map((v, i) => ({
        width: 1,
        data: minTimeLabel + i * deltaTime
    }))
    // console.log(shownData);
    // console.log(minTimeLabel);
    // console.log(deltaTime);

    return [
        {
            width: minPointDecimal / (deltaRange / range),
            data: ''
        },
        ...mainLabels,
        {
            width: maxPointDecimal / (deltaRange / range),
            data: ''
        }
    ];
}

export const convertXAxisLabelPosition: any = (shownData: TCandlestickData[], itemRange: TItemRange, interval: TInterval, width: number, amount: number) => {
    if (!width)
        return [];

    const data = findXLabels(shownData, itemRange, interval, amount);
    const labelWidth = width && width / data.reduce((total, next) => {
        return total + next.width;
    }, 0);
    const timeFormat = mapIntervalToLabelTimeType(interval, 0);

    let x = 0;
    return data.map((v, i) => {
        const w = v.width * labelWidth;
        const d = {
            x,
            centerPoint: x + w / 2,
            text: moment.unix(+v.data).format(timeFormat),
            width: w,
        }
        x += w;
        return d;
    })
}

const mapIntervalToTime = (interval: TInterval) => {
    switch (interval) {
        case '1m':
            return 60;
        case '5m':
            return 300;
        case '30m':
            return 1800;
        case '1h':
            return 3600;
        case '1d':
            return 86400;
        default:
            return 1;
    }
}


export const mapIntervalToLabelTimeType = (interval: TInterval, times) => {
    switch (interval) {
        case '1m':
            return 'hh:mm';
        case '5m':
            return 'hh:mm';
        case '30m':
            return 'hh:mm';
        case '1h':
            return 'hh:mm';
        case '1d':
            return 'hh:mm';
        default:
            return 'hh:mm';
    }
}


export const findYLabels: any = (shownData: TCandlestickData[], height: number, amount: number) => {
    if (!height)
        return [];

    const [min, max] = findMinMax(shownData);
    const delta = max - min;
    const range = delta / amount;
    const rangeValue = Math.ceil(range) || range;
    const labelHeight = height / (amount + 2);
    return _.range(-1, amount + 1).map((v, i) => {
        const y = height - labelHeight * (i + 1);
        return {
            y,
            centerPoint: y + labelHeight / 2,
            height: labelHeight,
            data: min + rangeValue * v
        }
    })
}


export const convertChartData = (xData, yData, shownData: TCandlestickData[], itemRange: TItemRange, width: number, height: number) => {
    const deltaYLabelRange = yData[1].data - yData[0].data;
    const minYPointData = yData[0].data - deltaYLabelRange / 2;
    const maxYPointData = yData[yData.length - 1].data + deltaYLabelRange / 2;

    const deltaYData = maxYPointData - minYPointData;
    console.log('--------------');
    console.log(yData);
    console.log(deltaYLabelRange);
    console.log(deltaYData);
}
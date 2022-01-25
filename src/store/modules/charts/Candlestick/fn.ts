import _ from 'lodash';
import moment from 'moment';
import { TInterval } from '~interfaces';
import { gcd } from '~utils';
import { TCandlestickData, TItemRange } from './interface';
export const convertData = (array: string[]) => {
    const [time, open, high, low, close] = array;
    const result: TCandlestickData = {
        time: parseInt(time) / 1000,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close)
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

export const findXLabels = (shownData: TCandlestickData[], itemRange: TItemRange, interval: TInterval, amount: number) => {
    const deltaRange = Math.floor(itemRange.max) - Math.ceil(itemRange.min);
    const range = deltaRange < amount ? deltaRange : amount;
    const minPointDecimal = _.ceil(itemRange.min) - itemRange.min;
    const maxPointDecimal = itemRange.max % 1;

    const deltaTime = (deltaRange / range) * mapIntervalToTime(interval);

    if (!deltaTime)
        return [];
    const minTimeLabel = shownData[+!!minPointDecimal].time;
    const mainLabels = _.range(0, range).map((v, i) => ({
        width: 1,
        data: minTimeLabel + i * deltaTime
    }))

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
        return;

    const data = findXLabels(shownData, itemRange, interval, amount);
    const labelWidth = width && width / data.reduce((total, next) => {
        return total + next.width;
    }, 0);

    let x = 0;
    return data.map((v, i) => {
        const w = v.width * labelWidth;
        const d = {
            x,
            centerPoint: x + w / 2,
            data: +v.data,
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
            return 'DD-MM';
        default:
            return 'hh:mm';
    }
}


export const findYLabels: any = (shownData: TCandlestickData[], height: number, amount: number) => {
    if (!height)
        return;
    const [min, max] = findMinMax(shownData);
    const niceMin = min < 0 ? min : Math.floor(min);
    const delta = max - niceMin;
    const range = delta / amount;
    const rangeValue = Math.ceil(range) || range;
    const labelHeight = height / (amount + 2);
    return _.range(-1, amount + 1).map((v, i) => {
        const y = height - labelHeight * (i + 1);
        return {
            y,
            centerPoint: y + labelHeight / 2,
            height: labelHeight,
            data: niceMin + rangeValue * v
        }
    })
}

const STICK_SPACING = 0.1;
export const convertChartData = (xData, yData, shownData: TCandlestickData[], itemRange: TItemRange, interval: TInterval, width: number, height: number) => {
    if (!width || !height || !xData || !yData || !xData.length || !yData.length)
        return;
    const yHeightPerUnit = calculateYHeightPerUnit(yData, height);
    const xWidthPerUnit = calculateXWidthtPerUnit(itemRange, width);
    const firstXPointPosition = width - xData[0].width;
    const firstXTimeData = xData[1].data;
    const timeDivisor = mapIntervalToTime(interval);
    const firstYData = yData[0].data;

    return shownData.map(d => {
        const x = xWidthPerUnit * (d.time - firstXTimeData) / timeDivisor;

        const yHigh = ((d.high - firstYData) + 0.5) * yHeightPerUnit;
        const yLow = ((d.low - firstYData) + 0.5) * yHeightPerUnit;
        const yOpen = ((d.open - firstYData) + 0.5) * yHeightPerUnit;
        const yClose = ((d.close - firstYData) + 0.5) * yHeightPerUnit;
        const stickDirection = !(yOpen < yClose);
        const yBody = height - (stickDirection ? yOpen : yClose);
        const color = stickDirection ? 'red' : 'green';
        const rect = {
            x: x + (xWidthPerUnit / 2) * STICK_SPACING,
            xCenterPoint: x + (xWidthPerUnit / 2),
            width: xWidthPerUnit * (1 - STICK_SPACING),
            y: height - (stickDirection ? yOpen : yClose),
            height: Math.abs(yOpen - yClose),
            color
        }
        const line = {
            x: x + (xWidthPerUnit / 2),
            y1: height - yHigh,
            y2: height - yLow,
            color
        }
        return {
            rect,
            line,
        }
    });
}

const calculateYHeightPerUnit = (yData, height: number) => {
    const deltaRange = yData[1].data - yData[0].data;
    const min = yData[0].data - deltaRange / 2;
    const max = yData[yData.length - 1].data + deltaRange / 2;

    const delta = max - min;
    return height / delta;
}

const calculateXWidthtPerUnit = (itemRange: TItemRange, width: number) => {
    const delta = itemRange.max - itemRange.min;
    return width / delta;
}


export const calculateZoomValue = (zoom, value, max = 2, min = 0) => {
    const newZoom = +parseFloat(zoom + value).toFixed(3);
    return newZoom < min ? min : newZoom > max ? max : newZoom;
}
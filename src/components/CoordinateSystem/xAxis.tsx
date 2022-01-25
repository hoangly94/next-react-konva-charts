import React from 'react'
import _ from 'lodash';
// import CoordinateSystem from './CoordinateSystem';
import { SStageXAsis } from './styled';
import { AppState } from '~store';
import { convertXAxisLabelPosition, findXLabels, mapIntervalToLabelTimeType } from '~store/modules/charts/Candlestick/fn';
import { Layer, Text } from 'react-konva';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '~hooks';
import { useDimensions } from 'sezy-design/hooks';
import { setCoordinatesXAxisData } from '~store/modules/charts/Candlestick/slice';

const XAsis = () => {
    const dispatch = useAppDispatch();
    const shownData = useAppSelector(state => state.candlestick.shownData);
    const itemRange = useAppSelector(state => state.candlestick.itemRange);
    const interval = useAppSelector(state => state.candlestick.filter.interval.value);

    const wrapperRef = React.useRef(null);
    const { offsetWidth: width, offsetHeight: height } = useDimensions(wrapperRef);

    const xAxisData = convertXAxisLabelPosition(shownData, itemRange, interval, width, 10);
    const timeFormat = mapIntervalToLabelTimeType(interval, 0);

    React.useEffect(() => {
        dispatch(setCoordinatesXAxisData(xAxisData));
    }, [xAxisData]);
    console.log(xAxisData)
    return (
        <SStageXAsis
            ref={wrapperRef}
            width={width}
            height={height}
        >
            <Layer
                pixelRatio={2}
            >
                {
                    xAxisData?.map((label, index) =>
                        <Text
                            key={`xAxisl.label.${index}`}
                            x={label.x}
                            text={moment.unix(label.data).format(timeFormat)}
                            fontSize={15}
                            fill='#383838'
                            align='center'
                            verticalAlign='middle'
                            width={label.width}
                            height={40}
                        />
                    )
                }
            </Layer>
        </SStageXAsis>
    )
}

export default XAsis
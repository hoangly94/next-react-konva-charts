import React from 'react'
import _ from 'lodash';
import { Group, Layer, Line, Rect, Stage } from "react-konva";
// import CoordinateSystem from './CoordinateSystem';
import { SStage } from './styled';
import { convertChartData, convertXAxisLabelPosition, findYLabels } from '~store/modules/charts/Candlestick/fn';
import { AppState } from '~store';
import { useAppSelector } from '~hooks';
import { useDimensions } from 'sezy-design/hooks';

const Candlestick = () => {
    const wrapperRef = React.useRef(null);
    const { offsetWidth: width, offsetHeight: height } = useDimensions(wrapperRef);
    const itemRange = useAppSelector(state => state.candlestick.itemRange);
    const interval = useAppSelector(state => state.candlestick.filter.interval.value);
    const shownData = useAppSelector(state => state.candlestick.shownData);
    const xAxisData = useAppSelector(state => state.candlestick.xAxis?.data);
    const yAxisData = useAppSelector(state => state.candlestick.yAxis?.data);

    const data = xAxisData && yAxisData && convertChartData(xAxisData, yAxisData, shownData, itemRange, interval, width, height);

    // console.log('==========');
    // console.log(shownData);
    // console.log(xData);
    // console.log(data);
    // console.log(width);
    // console.log(height);
    // console.log(yData);
    return (
        <SStage
            ref={wrapperRef}
            width={width}
            height={height}
        >
            <Layer>
                {
                    xAxisData?.map((d, index) => <Line
                        key={`x.grid.${index}`}
                        points={[
                            d.centerPoint,
                            0,
                            d.centerPoint,
                            height
                        ]}
                        stroke='#e8e8e8'
                        strokeWidth={1}
                    />)
                }
                {
                    yAxisData?.map((d, index) => <Line
                        key={`y.grid.${index}`}
                        points={[
                            0,
                            d.centerPoint,
                            width,
                            d.centerPoint
                        ]}
                        stroke='#e8e8e8'
                        strokeWidth={1}
                    />)
                }
                {
                    !!data && data.map((d, index) => <Group
                        key={`stick.${index}`}>
                        <Line
                            points={[
                                d.line.x,
                                d.line.y1,
                                d.line.x,
                                d.line.y2
                            ]}
                            stroke={d.line.color}
                            strokeWidth={1}
                        />
                        <Rect
                            x={d.rect.x}
                            y={d.rect.y}
                            width={d.rect.width}
                            height={d.rect.height}
                            fill={d.rect.color}
                        />
                    </Group>)
                }
            </Layer>
        </SStage>
    )
}

export default Candlestick
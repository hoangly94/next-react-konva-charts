import React from 'react'
import _ from 'lodash';
import { Group, Layer, Line, Rect, Stage } from "react-konva";
// import CoordinateSystem from './CoordinateSystem';
import { IElementDimensions } from 'src/interfaces';
import { SStage } from './styled';
import { convertChartData, convertXAxisLabelPosition, findYLabels } from 'src/store/modules/charts/Candlestick/fn';
import { AppState } from 'src/store';

interface IProps {
    state: AppState
}
const Candlestick = ({
    state
}: IProps) => {
    const { itemRange, interval, shownData } = state.candlestick;
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);


    const width = dimensions?.offsetWidth || 0;
    const height = dimensions?.offsetHeight || 0;
    const xData = convertXAxisLabelPosition(shownData, itemRange, interval, width, 10);
    const yData = findYLabels(shownData, height, 10);

    const data = xData.length && yData.length && convertChartData(xData, yData, shownData, itemRange, interval, width, height);
    console.log('==========');
    console.log(shownData);
    console.log(xData);
    console.log(data);
    // console.log(yData);
    return (
        <SStage
            ref={wrapperRef}
            width={width}
            height={height}
        >
            <Layer>
                {
                    xData.map((d, index) => <Line
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
                    yData.map((d, index) => <Line
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
const parseDimensions = (wrapperRef) => {
    const element = wrapperRef.current?.attrs?.container;
    if (!element)
        return;
    const dimensions: IElementDimensions = {
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        offsetLeft: element.offsetLeft,
        offsetTop: element.offsetTop,
    };
    return dimensions;
}

export default Candlestick
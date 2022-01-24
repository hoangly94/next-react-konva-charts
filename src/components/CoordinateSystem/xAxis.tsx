import React from 'react'
import _ from 'lodash';
// import CoordinateSystem from './CoordinateSystem';
import { SStageXAsis } from './styled';
import { parseDimensions } from 'src/utils';
import { AppState } from 'src/store';
import { convertXAxisLabelPosition, findXLabels, mapIntervalToLabelTimeType } from 'src/store/modules/charts/Candlestick/fn';
import { Layer, Text } from 'react-konva';
import moment from 'moment';

interface IProps {
    state: AppState
}

const XAsis = ({
    state
}: IProps) => {
    const { itemRange, interval, shownData } = state.candlestick;
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);
    const width = dimensions?.offsetWidth || 0;
    const height = dimensions?.offsetHeight || 0;

    const labels = convertXAxisLabelPosition(shownData, itemRange, interval, width, 10);

    const timeFormat = mapIntervalToLabelTimeType(interval, 0);

    return (
        <SStageXAsis
            ref={wrapperRef}
            width={width}
            height={height}
        >
            <Layer>
                {
                    labels?.map((label, index) =>
                        <Text
                            key={`xAxisl.label.${index}`}
                            x={label.x}
                            text={moment.unix(label.data).format(timeFormat)}
                            fontSize={15}
                            fill='#484848'
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
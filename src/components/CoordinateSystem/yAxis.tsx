import React from 'react'
import _ from 'lodash';
import { SStageYAsis } from './styled';
import { AppState } from 'src/store';
import { parseDimensions } from 'src/utils';
import { findMinMax, findYLabels } from 'src/store/modules/charts/Candlestick/fn';
import { Layer, Text } from 'react-konva';

interface IProps {
    state: AppState
}

const YAsis = ({
    state
}: IProps) => {
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);

    const { shownData } = state.candlestick;
    const width = dimensions?.offsetWidth || 0;
    const height = dimensions?.offsetHeight || 0;

    const labels = findYLabels(shownData, height, 10);
    return (
        <SStageYAsis
            ref={wrapperRef}
            width={width}
            height={height}
        // y={height}
        // scaleY={-1}
        >
            <Layer>
                {
                    labels?.map((label, index) =>
                        <Text
                            key={`xAxisl.label.${index}`}
                            y={label.y}
                            text={label.data ? label.data .toFixed(2) : ''}
                            fontSize={15}
                            fill='#484848'
                            align='center'
                            verticalAlign='middle'
                            width={80}
                            height={label.height}
                        />
                    )
                }
            </Layer>
        </SStageYAsis>
    )
}

export default YAsis
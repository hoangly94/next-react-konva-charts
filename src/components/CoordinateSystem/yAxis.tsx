import React from 'react'
import _ from 'lodash';
import { SStageYAsis } from './styled';
import { findYLabels } from '~store/modules/charts/Candlestick/fn';
import { Layer, Text } from 'react-konva';
import { useAppDispatch, useAppSelector } from '~hooks';
import { useDimensions } from 'sezy-design/hooks';
import { setCoordinatesYAxisData } from '~store/modules/charts/Candlestick/slice';

const YAsis = () => {
    const dispatch = useAppDispatch();
    const shownData = useAppSelector(state => state.candlestick.shownData);
    const wrapperRef = React.useRef(null);
    const { offsetWidth: width, offsetHeight: height } = useDimensions(wrapperRef);

    const yAxisData = findYLabels(shownData, height, 10);
    
    React.useEffect(() => {
        dispatch(setCoordinatesYAxisData(yAxisData));
    }, [yAxisData]);

    return (
        <SStageYAsis
            ref={wrapperRef}
            width={width}
            height={height}
            pixelRatio={2}
        >
            <Layer>
                {
                    yAxisData?.map((label, index) =>
                        <Text
                            key={`xAxisl.label.${index}`}
                            y={label.y}
                            text={label.data ? label.data.toFixed(2) : ''}
                            fontSize={15}
                            fill='black'
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
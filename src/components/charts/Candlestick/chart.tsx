import React from 'react'
import _ from 'lodash';
import { Stage } from "react-konva";
// import CoordinateSystem from './CoordinateSystem';
import { IElementDimensions } from 'src/interfaces';
import {  SStage } from './styled';

const Candlestick = () => {
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);
    return (
        <SStage
            ref={wrapperRef}
            width={dimensions?.offsetWidth}
            height={dimensions?.offsetHeight}
            y={dimensions?.offsetHeight}
            scaleY={-1}
        >
            {/* <CoordinateSystem
                state={coordinatesState}
                dimensions={dimensions}
            /> */}
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
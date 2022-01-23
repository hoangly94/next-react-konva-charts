import React from 'react'
import _ from 'lodash';
// import CoordinateSystem from './CoordinateSystem';
import { SStageXAsis } from './styled';
import { parseDimensions } from 'src/utils';
import { AppState } from 'src/store';

interface IProps {
    state: AppState
}

const XAsis = ({
    state
}: IProps) => {
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);
    return (
        <SStageXAsis
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
        </SStageXAsis>
    )
}

export default XAsis
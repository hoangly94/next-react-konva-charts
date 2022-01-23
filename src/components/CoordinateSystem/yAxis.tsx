import React from 'react'
import _ from 'lodash';
import { SStageYAsis } from './styled';
import { AppState } from 'src/store';
import { parseDimensions } from 'src/utils';

interface IProps {
    state: AppState
}

const YAsis = ({
    state
}: IProps) => {
    const wrapperRef = React.useRef(null);
    const dimensions = parseDimensions(wrapperRef);
    return (
        <SStageYAsis
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
        </SStageYAsis>
    )
}

export default YAsis
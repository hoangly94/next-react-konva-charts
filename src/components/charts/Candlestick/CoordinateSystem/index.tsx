import React from 'react'
import { Section } from 'sezy-design'
import { useRouter } from 'next/router'
import _ from 'lodash';
import { SStage } from './styled';
import { Layer, Line, Rect, Stage } from 'react-konva';

const Candlestick = () => {
    const router = useRouter()
    return (
        <>
            <SStage>
                <Layer>
                    <Rect
                        x={20}
                        y={20}
                        width={50}
                        height={50}
                        fill="green"
                    // ref={rectRef}
                    />
                    <Line />
                </Layer>
            </SStage>
        </>
    )
}

export default Candlestick
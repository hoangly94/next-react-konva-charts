import React from 'react'
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchData } from 'src/store/modules/charts/Candlestick/slice';
import { SWrapper } from './styled';
import Chart from './chart';
import XAxis from 'src/components/CoordinateSystem/xAxis';
import YAxis from 'src/components/CoordinateSystem/yAxis';

const Candlestick = () => {
    const dispatch = useAppDispatch();
    //fetch first data
    React.useEffect(() => {
        dispatch(fetchData({}))
    }, []);

    const state = useAppSelector(state => state);
    
    return (
        <SWrapper>
            <Chart
                state={state}
            />
            <YAxis
                state={state}
            />
            <XAxis
                state={state}
            />
        </SWrapper>
    )
}

export default Candlestick
import React from 'react'
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '~hooks';
import { fetchData } from '~store/modules/charts/Candlestick/slice';
import Menu from '~components/Menu';
import { SWrapper } from './styled';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('~components/charts/Candlestick/chart'), {
    ssr: false,
});
const XAxis = dynamic(() => import('~components/CoordinateSystem/xAxis'), {
    ssr: false,
});
const YAxis = dynamic(() => import('~components/CoordinateSystem/yAxis'), {
    ssr: false,
});
const Setting = dynamic(() => import('~components/Setting'), {
    ssr: false,
});

const Candlestick = () => {
    const dispatch = useAppDispatch();
    
    React.useEffect(() => {
        //fetch first data
        dispatch(fetchData());
    }, []);

    return (
        <SWrapper>
            <Menu />
            <Chart />
            <YAxis />
            <XAxis />
            <Setting />
        </SWrapper>
    )
}

export default Candlestick
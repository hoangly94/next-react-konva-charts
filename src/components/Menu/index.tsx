import React from 'react'
import _ from 'lodash';
import { SIntervalButton, SLimitInput, SMenu, SOther, SSymbolInput, SZoomButtons } from './styled';
import { useAppDispatch, useAppSelector } from '~hooks';
import { fetchData, setCoordinatesZoom, setIntervalFilter, setLimitFilter, setSymbolFilter } from '~store/modules/charts/Candlestick/slice';
import { Button, Input } from 'sezy-design';
import ZoomInIcon from 'sezy-design/components/icon/solid/minus';
import ZoomOutIcon from 'sezy-design/components/icon/solid/plus';
import OtherIcon from 'sezy-design/components/icon/solid/bars';

const Menu = () => {
    const dispatch = useAppDispatch();
    const symbolRef: any = React.useRef(null);
    const limitRef: any = React.useRef(null);
    const symbolFilter = useAppSelector(state => state.candlestick.filter.symbol);
    const intervalFilter = useAppSelector(state => state.candlestick.filter.interval);
    const limitFilter = useAppSelector(state => state.candlestick.filter.limit);
    const zoom = useAppSelector(state => state.candlestick.xAxis.zoom);

    React.useEffect(() => {
        symbolRef.current.value = symbolFilter.value;
        limitRef.current.value = limitFilter.value;
    }, [])

    return (
        <SMenu>
            <div>
                <SSymbolInput>
                    <Input
                        ref={symbolRef}
                        placeholder={symbolRef?.current ? 'Symbol...' : ''}
                        onBlur={element => {
                            dispatch(setSymbolFilter(element.value));
                            dispatch(fetchData());
                        }}
                        isLoading={symbolFilter.isLoading}
                    />
                </SSymbolInput>
                <SIntervalButton>
                    <Button
                        label='1m'
                        onClick={element => {
                            dispatch(setIntervalFilter('1m'));
                            dispatch(fetchData());
                        }}
                        isActive={intervalFilter.value === '1m'}
                    />
                    <Button
                        label='5m'
                        onClick={element => {
                            dispatch(setIntervalFilter('5m'));
                            dispatch(fetchData());
                        }}
                        isActive={intervalFilter.value === '5m'}
                    />
                    <Button
                        label='30m'
                        onClick={element => {
                            dispatch(setIntervalFilter('30m'));
                            dispatch(fetchData());
                        }}
                        isActive={intervalFilter.value === '30m'}
                    />
                    <Button
                        label='1h'
                        onClick={element => {
                            dispatch(setIntervalFilter('1h'));
                            dispatch(fetchData());
                        }}
                        isActive={intervalFilter.value === '1h'}
                    />
                    <Button
                        label='1d'
                        onClick={element => {
                            dispatch(setIntervalFilter('1d'));
                            dispatch(fetchData());
                        }}
                        isActive={intervalFilter.value === '1d'}
                    />
                </SIntervalButton>
                <SLimitInput>
                    <Input
                        ref={limitRef}
                        placeholder={symbolRef?.current ? 'Limit...' : ''}
                        onBlur={element => {
                            dispatch(setLimitFilter(element.value));
                            dispatch(fetchData());
                        }}
                        isLoading={limitFilter.isLoading}
                    />
                </SLimitInput>
                <SZoomButtons>
                    <ZoomInIcon
                        size='l1'
                        onClick={() => dispatch(setCoordinatesZoom({ value: -0.1 }))}
                    />
                    <ZoomOutIcon
                        size='l1'
                        onClick={() => dispatch(setCoordinatesZoom({ value: 0.1 }))}
                    />
                </SZoomButtons>
            </div>
            <SOther>
                <OtherIcon />
            </SOther>
        </SMenu>
    )
}

export default Menu
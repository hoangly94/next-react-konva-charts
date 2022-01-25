import { Button, Input } from "sezy-design";
import styled from "styled-components";

export const SMenu = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    width:100%;
    height:50px;
    border-bottom: 1px solid var(--border-color);

    &>div:first-child{
        
        display:flex;
        width:80%;
    }
`;

export const SSymbolInput = styled.div`
    display:flex;
    align-items:center;
    border-right: 1px solid var(--border-color);
    padding: 0 18px;

    &>div{
        width:130px;
        text-align:center;
    }
    & input{
        text-align:center;
    }
`;

export const SIntervalButton = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-right: 1px solid var(--border-color);
    padding: 0 18px;
    width:300px;

    &>button{
        width:18%;

        &[active]{
            background:#ff7dfb;
        }
    }
`;

export const SLimitInput = styled.div`
    display:flex;
    align-items:center;
    border-right: 1px solid var(--border-color);
    padding: 0 18px;

    &>div{
        width:80px;
    }
    & input{
        text-align:center;
    }
`;

export const SZoomButtons = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100px;
    padding: 0 18px;
    box-sizing:border-box;
    border-right: 1px solid var(--border-color);
`;
export const SOther = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 100%;
    border-left: 1px solid var(--border-color);
    width:80px;
    box-sizing:border-box;
`;
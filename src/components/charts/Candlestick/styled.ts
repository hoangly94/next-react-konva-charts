import { Stage } from "react-konva";
import { Section } from "sezy-design";
import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const SWrapper = styled.div`
    line-height:0;
    box-sizing:border-box;
    width:80%;
    height:60%;
    padding-top: 5%;
    margin: auto;
`;

export const SStage = styled(Stage)`
    display:inline-block;
    border-top: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    box-sizing:border-box;
    width:calc(100% - 80px);
    height:calc(100% - 40px);
`;
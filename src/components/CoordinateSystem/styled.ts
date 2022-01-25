import { Stage } from "react-konva";
import { Section } from "sezy-design";
import styled from "styled-components";
import breakpoints from "~styles/breakpoints";

export const SStageXAsis = styled(Stage)`
    display:inline-block;
    box-sizing:border-box;
    width:calc(100% - 80px);
    height:40px;
    border-top: 1px solid var(--border-color);
    vertical-align: top;
`;

export const SStageYAsis = styled(Stage)`
    display:inline-block;
    box-sizing:border-box;
    width:80px;
    height:calc(100% - 40px - 50px);
    border-left: 1px solid var(--border-color);
`;
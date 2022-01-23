import { Stage } from "react-konva";
import { Section } from "sezy-design";
import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const SStageXAsis = styled(Stage)`
    display:inline-block;
    box-sizing:border-box;
    width:calc(100% - 80px);
    height:40px;
    border: 1px solid var(--border-color);
`;

export const SStageYAsis = styled(Stage)`
    display:inline-block;
    box-sizing:border-box;
    width:80px;
    height:calc(100% - 40px);
    border: 1px solid var(--border-color);
`;
import { Stage } from "react-konva";
import styled from "styled-components";

export const SStage = styled(Stage)`
    display:inline-block;
    box-sizing:border-box;
    width:calc(100% - 80px);
    height:calc(100% - 40px - 50px);
`;
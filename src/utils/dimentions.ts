import { IElementDimensions } from "src/interfaces";

export const parseDimensions = (wrapperRef) => {
    const element = wrapperRef.current?.attrs?.container;
    if (!element)
        return;
    const dimensions: IElementDimensions = {
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        offsetLeft: element.offsetLeft,
        offsetTop: element.offsetTop,
    };
    return dimensions;
}
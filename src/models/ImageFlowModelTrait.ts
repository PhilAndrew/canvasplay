
export interface ImageFlowModelTrait {
    id: string; // A unique id which identifies this flow mapping
    sourceCanvasId: string; // The id of the canvas element on page which is the source
    targetCanvasId: string; // The id of the canvas element on page which is the target
    sourceRectTop: number;
    sourceRectLeft: number;
    sourceRectWidth: number;
    sourceRectHeight: number;
    targetRectTop: number;
    targetRectLeft: number;
    targetRectWidth: number;
    targetRectHeight: number;

}


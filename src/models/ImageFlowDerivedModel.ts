import {ImageFlowModelTrait} from "./ImageFlowModelTrait";

export class ImageFlowDerivedModel implements ImageFlowModelTrait {
    constructor() {
    }
    get targetCanvasId(): string {
        return "";
    }
    set targetCanvasId(value: string) {
    }
    get sourceCanvasId(): string {
        return "";
    }
    set sourceCanvasId(value: string) {
    }
    get flowMappingId(): string {
        return "";
    }
    set flowMappingId(value: string) {
    }
}
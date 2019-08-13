import {ImageFlowModel} from "./ImageFlowModel";

export interface ImageModelTrait {
    id: string; // A unique id which identifies this flow mapping
    imageFlows: Array<ImageFlowModel>;
}
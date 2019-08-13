import {ImageModelTrait} from "./ImageModelTrait";
import {ImageFlowModel} from "./ImageFlowModel";

export class ImageModel implements ImageModelTrait {
    constructor(id: string) {
        this._id = id;
        this._imageFlows = new Array<ImageFlowModel>()
    }
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }
    get imageFlows(): Array<ImageFlowModel> {
        return this._imageFlows;
    }
    set imageFlows(value: Array<ImageFlowModel>) {
        this._imageFlows = value;
    }
    private _id: string;
    private _imageFlows: Array<ImageFlowModel>
}
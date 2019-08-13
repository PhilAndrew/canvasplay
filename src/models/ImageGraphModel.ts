import {ImageFlowModel} from "./ImageFlowModel";

export class ImageGraphModel {
    constructor() {
        this._imageFlows = new Array<ImageFlowModel>()
    }

    get imageFlows(): Array<ImageFlowModel> {
        return this._imageFlows;
    }

    set imageFlows(value: Array<ImageFlowModel>) {
        this._imageFlows = value;
    }

    private _imageFlows: Array<ImageFlowModel>
}
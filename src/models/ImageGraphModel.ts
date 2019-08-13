import {ImageFlowModel} from "./ImageFlowModel";
import {ImageModel} from "./ImageModel";

export class ImageGraphModel {
    constructor() {
        this._imageFlows = new Array<ImageFlowModel>()
        this._rootImageModel = new ImageModel("")
    }

    get rootImageModel(): ImageModel {
        return this._rootImageModel;
    }
    set rootImageModel(value: ImageModel) {
        this._rootImageModel = value;
    }
    get imageFlows(): Array<ImageFlowModel> {
        return this._imageFlows;
    }
    set imageFlows(value: Array<ImageFlowModel>) {
        this._imageFlows = value;
    }

    private _imageFlows: Array<ImageFlowModel>
    private _rootImageModel: ImageModel
}
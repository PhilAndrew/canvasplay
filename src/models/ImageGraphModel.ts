import {ImageFlowModel} from "./ImageFlowModel";
import {ImageModel} from "./ImageModel";

export class ImageGraphModel {
    constructor() {
        this._rootImageModel = new ImageModel("")
    }

    get rootImageModel(): ImageModel {
        return this._rootImageModel;
    }
    set rootImageModel(value: ImageModel) {
        this._rootImageModel = value;
    }
    private _rootImageModel: ImageModel
}
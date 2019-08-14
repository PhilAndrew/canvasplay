import {ImageFlowModelTrait} from "./ImageFlowModelTrait";
import {ImageModel} from "./ImageModel";
import {ImageMapping} from "./ImageMapping";

export class ImageFlowModel implements ImageFlowModelTrait {
    static build(id: string, source: ImageModel, target: ImageModel, fromTo: Array<ImageMapping>): ImageFlowModel
    {
        const result = new ImageFlowModel(id, source.id, target.id, source, target, fromTo);
        return result;
    }

    constructor(id: string, sourceCanvasId: string, targetCanvasId: string, source: ImageModel, target: ImageModel, fromTo: Array<ImageMapping>) {
        this._id = id;
        this._sourceCanvasId = sourceCanvasId;
        this._targetCanvasId = targetCanvasId;
        this._fromToRectangles = fromTo;
        this._source = source;
        this._target = target;
    }

    get target(): ImageModel {
        return this._target;
    }

    set target(value: ImageModel) {
        this._target = value;
    }
    get source(): ImageModel {
        return this._source;
    }

    set source(value: ImageModel) {
        this._source = value;
    }
    get fromToRectangles(): Array<ImageMapping> {
        return this._fromToRectangles;
    }

    set fromToRectangles(value: Array<ImageMapping>) {
        this._fromToRectangles = value;
    }

    get targetCanvasId(): string {
        return this._targetCanvasId;
    }

    set targetCanvasId(value: string) {
        this._targetCanvasId = value;
    }
    get sourceCanvasId(): string {
        return this._sourceCanvasId;
    }

    set sourceCanvasId(value: string) {
        this._sourceCanvasId = value;
    }
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
    private _id: string; // A unique id which identifies this flow mapping
    private _sourceCanvasId: string; // The id of the canvas element on page which is the source
    private _targetCanvasId: string; // The id of the canvas element on page which is the target
    private _fromToRectangles: Array<ImageMapping>;
    private _source: ImageModel;
    private _target: ImageModel;
}

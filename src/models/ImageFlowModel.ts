import {ImageFlowModelTrait} from "./ImageFlowModelTrait";
import {ImageModel} from "./ImageModel";

export class ImageFlowModel implements ImageFlowModelTrait {

    static build(id: string, source: ImageModel, target: ImageModel): ImageFlowModel
    {
        const result = new ImageFlowModel(id, source.id, target.id);
        return result;
    }

    constructor(id: string, sourceCanvasId: string, targetCanvasId: string) {
        this._id = id;
        this._sourceCanvasId = sourceCanvasId;
        this._targetCanvasId = targetCanvasId;

        this._sourceRectTop = 0;
        this._sourceRectLeft = 0;
        this._sourceRectWidth = 0;
        this._sourceRectHeight = 0;

        this._targetRectTop = 0;
        this._targetRectLeft = 0;
        this._targetRectWidth = 0;
        this._targetRectHeight = 0;
    }

    get targetRectHeight(): number {
        return this._targetRectHeight;
    }

    set targetRectHeight(value: number) {
        this._targetRectHeight = value;
    }
    get targetRectWidth(): number {
        return this._targetRectWidth;
    }

    set targetRectWidth(value: number) {
        this._targetRectWidth = value;
    }
    get targetRectLeft(): number {
        return this._targetRectLeft;
    }

    set targetRectLeft(value: number) {
        this._targetRectLeft = value;
    }
    get targetRectTop(): number {
        return this._targetRectTop;
    }

    set targetRectTop(value: number) {
        this._targetRectTop = value;
    }
    get sourceRectHeight(): number {
        return this._sourceRectHeight;
    }

    set sourceRectHeight(value: number) {
        this._sourceRectHeight = value;
    }
    get sourceRectWidth(): number {
        return this._sourceRectWidth;
    }

    set sourceRectWidth(value: number) {
        this._sourceRectWidth = value;
    }
    get sourceRectLeft(): number {
        return this._sourceRectLeft;
    }

    set sourceRectLeft(value: number) {
        this._sourceRectLeft = value;
    }
    get sourceRectTop(): number {
        return this._sourceRectTop;
    }

    set sourceRectTop(value: number) {
        this._sourceRectTop = value;
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
    private _sourceRectTop: number;
    private _sourceRectLeft: number;
    private _sourceRectWidth: number;
    private _sourceRectHeight: number;
    private _targetRectTop: number;
    private _targetRectLeft: number;
    private _targetRectWidth: number;
    private _targetRectHeight: number;
}

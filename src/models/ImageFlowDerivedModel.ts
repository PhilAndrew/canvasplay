import {ImageFlowModelTrait} from "./ImageFlowModelTrait";

export class ImageFlowDerivedModel implements ImageFlowModelTrait {
    constructor() {
        this._id = "";
        this._sourceCanvasId = "";
        this._sourceRectHeight = 0;
        this._sourceRectLeft = 0;
        this._sourceRectTop = 0;
        this._sourceRectWidth = 0;
        this._targetCanvasId = "";
        this._targetRectHeight = 0;
        this._targetRectLeft = 0;
        this._targetRectTop = 0;
        this._targetRectWidth = 0;

    }

    get targetRectWidth(): number {
        return this._targetRectWidth;
    }

    set targetRectWidth(value: number) {
        this._targetRectWidth = value;
    }
    get targetRectTop(): number {
        return this._targetRectTop;
    }

    set targetRectTop(value: number) {
        this._targetRectTop = value;
    }
    get targetRectLeft(): number {
        return this._targetRectLeft;
    }

    set targetRectLeft(value: number) {
        this._targetRectLeft = value;
    }
    get targetRectHeight(): number {
        return this._targetRectHeight;
    }

    set targetRectHeight(value: number) {
        this._targetRectHeight = value;
    }
    get targetCanvasId(): string {
        return this._targetCanvasId;
    }

    set targetCanvasId(value: string) {
        this._targetCanvasId = value;
    }
    get sourceRectWidth(): number {
        return this._sourceRectWidth;
    }

    set sourceRectWidth(value: number) {
        this._sourceRectWidth = value;
    }
    get sourceRectTop(): number {
        return this._sourceRectTop;
    }

    set sourceRectTop(value: number) {
        this._sourceRectTop = value;
    }
    get sourceRectLeft(): number {
        return this._sourceRectLeft;
    }

    set sourceRectLeft(value: number) {
        this._sourceRectLeft = value;
    }
    get sourceRectHeight(): number {
        return this._sourceRectHeight;
    }

    set sourceRectHeight(value: number) {
        this._sourceRectHeight = value;
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

    private _id: string;
    private _sourceCanvasId: string;
    private _sourceRectHeight: number;
    private _sourceRectLeft: number;
    private _sourceRectTop: number;
    private _sourceRectWidth: number;
    private _targetCanvasId: string;
    private _targetRectHeight: number;
    private _targetRectLeft: number;
    private _targetRectTop: number;
    private _targetRectWidth: number;
}
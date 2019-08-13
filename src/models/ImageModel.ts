import {ImageModelTrait} from "./ImageModelTrait";

export class ImageModel implements ImageModelTrait {

    constructor(id: string) {
        this._id = id;
    }
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }
    private _id: string;

}
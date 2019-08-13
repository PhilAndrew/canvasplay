import {ImageGraphModel} from "../models/ImageGraphModel";
import {ImageFlowModel} from "../models/ImageFlowModel";
import {ImageModel} from "../models/ImageModel";

export class ModelGenerator {

    public generateGraphExample1(): ImageGraphModel {
        var result = new ImageGraphModel();

        // There is a source canvas, 3 intermediate canvases and lists from those intermediate canvases

        // Source canvas
        var source = new ImageModel(this.generateSourceCanvasRandomId());

        // Three intermediate canvases
        var intermediateCanvas1 = new ImageModel(this.generateIntermediateCanvasRandomId());
        var intermediateCanvas2 = new ImageModel(this.generateIntermediateCanvasRandomId());
        var intermediateCanvas3 = new ImageModel(this.generateIntermediateCanvasRandomId());

        // Flow mappings
        var flow1 = ImageFlowModel.build(this.generateFlowMappingId(), source, intermediateCanvas1);
        var flow2 = ImageFlowModel.build(this.generateFlowMappingId(), source, intermediateCanvas2);
        var flow3 = ImageFlowModel.build(this.generateFlowMappingId(), source, intermediateCanvas3);

        //var source = new ImageFlowModel(this.generateFlowMappingId(), this.generateSourceCanvasRandomId(), this.generateTargetCanvasRandomId());

        return result;
    }

    private generateFlowMappingId(): string {
        return "flowMappingId_" + this.generateRandomId();
    }

    private generateRandomInteger(low: number, high: number): number {
        return Math.floor(Math.random() * (high-low)) + low;
    }

    private generateRandomId(): string {
        return this.generateRandomInteger(1000000, 9999999).toString();
    }

    private generateSourceCanvasRandomId(): string {
        return "sourceCanvas_" + this.generateRandomId();
    }

    private generateTargetCanvasRandomId(): string {
        return "targetCanvas_" + this.generateRandomId();
    }

    private generateIntermediateCanvasRandomId(): string {
        return "intermediateCanvas_" + this.generateRandomId();
    }
}
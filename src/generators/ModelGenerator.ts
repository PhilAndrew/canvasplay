import {ImageGraphModel} from "../models/ImageGraphModel";
import {ImageFlowModel} from "../models/ImageFlowModel";
import {ImageModel} from "../models/ImageModel";
import {ImageMapping} from "../models/ImageMapping";

export class ModelGenerator {

    public static generateGraphExample1(): ImageGraphModel {

        var generator = new ModelGenerator();

        var result = new ImageGraphModel();

        // There is a source canvas, 3 intermediate canvases and lists from those intermediate canvases

        // Source canvas
        var source = new ImageModel(generator.generateSourceCanvasRandomId());

        // Three intermediate canvases
        var intermediateCanvas1 = new ImageModel(generator.generateIntermediateCanvasRandomId());
        var intermediateCanvas2 = new ImageModel(generator.generateIntermediateCanvasRandomId());
        var intermediateCanvas3 = new ImageModel(generator.generateIntermediateCanvasRandomId());

        var rect1 = new ImageMapping();
        rect1.sourceRectTop = 0;
        rect1.sourceRectLeft = 0;
        rect1.sourceRectWidth = 1024;
        rect1.sourceRectHeight = 1024;
        rect1.targetRectTop = 0;
        rect1.targetRectLeft = 0;
        rect1.targetRectWidth = 1024;
        rect1.targetRectHeight = 1024;
        var fromTo1 = new Array<ImageMapping>(rect1);

        var rect2 = new ImageMapping();
        rect2.sourceRectTop = 0;
        rect2.sourceRectLeft = 0;
        rect2.sourceRectWidth = 1024;
        rect2.sourceRectHeight = 1024;
        rect2.targetRectTop = 0;
        rect2.targetRectLeft = 0;
        rect2.targetRectWidth = 1024;
        rect2.targetRectHeight = 1024;
        var fromTo2 = new Array<ImageMapping>(rect2);

        var rect3 = new ImageMapping();
        rect3.sourceRectTop = 0;
        rect3.sourceRectLeft = 0;
        rect3.sourceRectWidth = 1024;
        rect3.sourceRectHeight = 1024;
        rect3.targetRectTop = 0;
        rect3.targetRectLeft = 0;
        rect3.targetRectWidth = 1024;
        rect3.targetRectHeight = 1024;
        var fromTo3 = new Array<ImageMapping>(rect3);

        // Flow mappings
        var flow1 = ImageFlowModel.build(generator.generateFlowMappingId(), source, intermediateCanvas1, fromTo1);
        var flow2 = ImageFlowModel.build(generator.generateFlowMappingId(), source, intermediateCanvas2, fromTo2);
        var flow3 = ImageFlowModel.build(generator.generateFlowMappingId(), source, intermediateCanvas3, fromTo3);

        source.imageFlows = new Array<ImageFlowModel>(flow1, flow2, flow3);
        result.rootImageModel = source;

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
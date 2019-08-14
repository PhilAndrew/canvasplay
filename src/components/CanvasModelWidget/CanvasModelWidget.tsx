
import React from 'react';
import './CanvasModelWidget.css';
import {ImageGraphModel} from "../../models/ImageGraphModel";
import {ModelGenerator} from "../../generators/ModelGenerator";
import VideoWidget from "../VideoWidget/VideoWidget";

interface CanvasModelWidgetProps {
    graph: ImageGraphModel;
    dummy: Array<String>;
}

class CanvasModelWidget extends React.Component<CanvasModelWidgetProps> {

    constructor(props: CanvasModelWidgetProps) {
        super(props);
    }

    static defaultProps = {
        dummy: new Array<String>("a", "b", "c"),
        graph: ModelGenerator.generateGraphExample1()
    };

    /**
     * Generate the widgets on the page which match this ImageGraphModel.
     * @param graph
     */
    createFrom(graph: ImageGraphModel) {
        // @todo this
    }


    render = () => {
        const {graph, dummy} = this.props;
        return (
            <div>
                <p>First a root canvas with id of {graph.rootImageModel.id}</p>
                {graph.rootImageModel.imageFlows.map(((flow, k) => {
                    return <div key={flow.id}>Image flow with target canvas id {flow.targetCanvasId} id of {flow.id} and {flow.fromToRectangles.length} total mappings.</div>
                }))}

                <div>
                <VideoWidget
                    mainBodyId="vbody1"
                    videoSourceName="videoframe-source-canvas"
                    width={1024}
                    height={1024}
                    wsUrl="ws://localhost:9002/"
                />
                </div>
            </div>
        )
    }
}

export default CanvasModelWidget;


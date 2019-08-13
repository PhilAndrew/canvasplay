
import React from 'react';
import './CanvasModelWidget.css';
import {ImageGraphModel} from "../../models/ImageGraphModel";
import {ModelGenerator} from "../../generators/ModelGenerator";

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
            dummy.map((d) => {
                return (
                <div>{d}</div>)
            })
        )
    }
}

export default CanvasModelWidget;


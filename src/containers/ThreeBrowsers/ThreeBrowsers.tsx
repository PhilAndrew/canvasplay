import * as React from "react";

import { connect } from "react-redux";
import * as MyTypes from "MyTypes";
import 'react-virtualized/styles.css';

import './ThreeBrowsers.css';

import CanvasModelWidget from "../../components/CanvasModelWidget/CanvasModelWidget";
import {ImageGraphModel} from "../../models/ImageGraphModel";


interface BasicCanvasManipulateState {
    canvases: string;
    drawSource: boolean;
}

interface BasicCanvasManipulateProps {
    graph: ImageGraphModel;
    source_canvas_basic: any;
    imageFlowsBasic: any[];
    setSourceCanvasBasic: (sourceCanvas: any) => object;
    setRandomImageFlowsBasic: (imageFlowsBasic: any) => object;
}

class BasicCanvasManipulate extends React.Component<BasicCanvasManipulateProps> {
    constructor(props: BasicCanvasManipulateProps) {
        super(props);

        this.state = {
            canvases: "",
            drawSource: false
        };
    }
    render() {
        const {source_canvas_basic} = this.props;

        return (
            <div className="page-body">
                <h4 className="page-title">
                    Basic Canvas Manipulate
                </h4>
            <CanvasModelWidget  graph={this.props.graph} />
            </div>
        );
    }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
    return {
        source_canvas_basic: store.canvasRs.source_canvas_basic,
        imageFlowsBasic: store.canvasRs.imageFlowsBasic
    };
};

export default connect(
    MapStateToProps,
)(BasicCanvasManipulate);

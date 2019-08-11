import * as React from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';
import CanvasWidget from "../../components/CanvasWidget/CanvasWidget";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column } from "react-virtualized";
import 'react-virtualized/styles.css';

import './ThreeBrowsers.css';

import * as sourceImg from '../../assets/test.jpg';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 157
})

interface BasicCanvasManipulateState {
    canvases: string;
    drawSource: boolean;
}

interface BasicCanvasManipulateProps {
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

    generateRandomImageFlows = () => {
        const {source_canvas_basic} = this.props;

        let imageFlows = [];
        for (let i = 0; i < 100; i++) {
            let source: any = [];
            let target: any = [];
            let sub_flow_mapping_id = [];

            const randomNumberOfSourceData = Math.floor(Math.random() * 100) % 10 + 1; // max 10 number of sub flows
            for (let i = 0; i < randomNumberOfSourceData; i++) {
                let randWidth = Math.floor(Math.random() * 90) % 50 + 1; // max 50
                let randHeight = Math.floor(Math.random() * 157) % 50 + 1; // max 50
                let randX = Math.floor(Math.random() * 90) % (90 - randWidth) + 1;
                let randY = Math.floor(Math.random() * 157) % (157 - randHeight) + 1;
                source.push({
                    x: randX,
                    y: randY,
                    width: randWidth,
                    height: randHeight
                })
            }

            source.map((item: any) => {
                let xrand = Math.floor(Math.random() * 90);
                let yrand = Math.floor(Math.random() * 157);
                target.push({
                    x: (90 - xrand) >= item.width ? xrand : xrand - item.width,
                    y: (157 - yrand) >= item.height ? yrand : yrand - item.height,
                    width: item.width,
                    height: item.height
                })
                sub_flow_mapping_id.push("sub_flow_mapping_" + Math.floor(Math.random() * 12345));
            });

            imageFlows.push(
                {
                    flow_mapping_id: 'image-flow' + i,
                    source_canvas_id: source_canvas_basic.id,
                    target_canvas_id: 'canvas-t' + i,
                    source,
                    target,
                    real_source: source, // real copied imgs data
                    real_target: target, // real copied imgs data
                    real_sub_flow_mapping_id: sub_flow_mapping_id, // real copied img flows mapping ids.
                    sub_flow_mapping_id // each source->target ids
                }
            );
        }
        this.props.setRandomImageFlowsBasic(imageFlows);
    }

    drawSourceCanvas = (canvas: any) => {

        const node = canvas;
        const context = node.getContext('2d');

        const pixelRatio = window.devicePixelRatio || 1;
        const width = 90 * pixelRatio;
        const height = 157 * pixelRatio;

        context.canvas.width = width;
        context.canvas.height = height;

        let sourceImgHandler = new Image();
        let self = this;
        const {drawSource} = this.state;
        sourceImgHandler.onload = function () {
            if (drawSource) {
                context.drawImage(sourceImgHandler, 0, 0);
                self.renderTargetColumn();
            }
        }
        sourceImgHandler.src = sourceImg;
    }

    startDrawSourceCanvas = () => {
        this.setState({drawSource: true});
        this.props.setSourceCanvasBasic('ready to copy');
    }

    targetColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
        const {imageFlowsBasic} = this.props;

        return (
            <CellMeasurer
                cache={cache}
                key={dataKey}
                parent={parent}
                rowIndex={rowIndex}>
                <div
                    style={{
                        whiteSpace: 'normal',
                    }}>
                    <CanvasWidget key={'basic' + rowIndex+'1a'} isTopComment={false} isBorderNeeded={false} imageFlow={imageFlowsBasic[rowIndex]} />
                </div>
            </CellMeasurer>
        );
    };

    renderTargetColumn = () => {
        const {imageFlowsBasic} = this.props;

        const listHeight = 600;
        const rowWidth = 200;

        const element = (
            <AutoSizer>
                {
                    () => {
                        return <Table
                            width={rowWidth}
                            height={listHeight}
                            deferredMeasurementCache={cache}
                            headerHeight={20}
                            rowHeight={cache.defaultHeight}
                            rowCount={imageFlowsBasic.length}
                            rowGetter={({ index }) => imageFlowsBasic[index]}
                        >
                            <Column
                                width={200}
                                label='Target Canvas'
                                dataKey='target_canvas'
                                cellRenderer={this.targetColumnCellRenderer}
                            />
                        </Table>
                    }
                }
            </AutoSizer>
        );
        ReactDOM.render(element, document.getElementById('basic-canvas-manipulate-section'));
    }

    render() {
        const {source_canvas_basic} = this.props;


        return (
            <div className="page-body">
                <h4 className="page-title">
                    Basic Canvas Manipulate
                </h4>
                <div className="action-section">
                    <button className="draw-src-canvas" onClick={this.startDrawSourceCanvas}>
                        Draw Source Canvas
                    </button>
                    {
                        source_canvas_basic
                            ? <button className="generate-image-flows" onClick={this.generateRandomImageFlows}>
                                Generate Image Flows
                            </button>
                            : null
                    }
                </div>
                <div className="source-section">
                    <div className="canv-comp">
                        <h5 id="type" className="type">
                            Source Canvas
                        </h5>
                        <div className="canv-div">
                            <Canvas id="source-canvas" ref="source-canvas" width={90} height={157} draw={this.drawSourceCanvas} />
                        </div>
                    </div>
                </div>
                <div className="basic-canvas-manipulate-section" id="basic-canvas-manipulate-section">
                </div>
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

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
    setSourceCanvasBasic: (source_canvas_basic: any) => dispatch({ type: actionTypes.SET_SOURCE_CANVAS_BASIC, payload: source_canvas_basic }),
    setRandomImageFlowsBasic: (imageFlowsBasic: any) => dispatch({ type: actionTypes.SET_RANDOM_IMAGE_FLOWS_FOR_BASIC, payload: imageFlowsBasic })
});

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(BasicCanvasManipulate);

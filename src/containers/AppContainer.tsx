import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";
import Canvas from 'react-canvas-wrapper';
import CanvasWidget from "../components/CanvasWidget/CanvasWidget";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column } from "react-virtualized";
import 'react-virtualized/styles.css';

import './AppContainer.css';

import * as sourceImg from '../assets/test.jpg';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 157
})

interface AppContainerState {
  canvases: string;
  list: any[];
  drawSource: boolean;
  clipInfosFromSource: any[];
}

interface AppContainerProps {
  source_canvas: any;
  imageFlows: any[];
  setSourceCanvas: (sourceCanvas: any) => object;
  setRandomImageFlows: (imageFlows: any) => object;
}

class AppContainer extends React.Component<AppContainerProps> {
  constructor(props: AppContainerProps) {
    super(props);
    this.state = {
      canvases: "",
      drawSource: false,
      clipInfosFromSource: [{
        x: 0,
        y: 0,
        width: 20,
        height: 20
      }, {
        x: 20,
        y: 40,
        width: 20,
        height: 30
      }, {
        x: 50,
        y: 10,
        width: 10,
        height: 40
      }]
    };
  }

  generateRandomImageFlows = () => {
    const {source_canvas} = this.props;
    const {clipInfosFromSource} = this.state;

    let imageFlows = [];
    for (let i = 0; i < 100; i++) {
      let target: any = [];
      let sub_flow_mapping_id = [];
      clipInfosFromSource.map((item: any) => {
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
          source_canvas_id: source_canvas.id,
          target_canvas_id: 'canvas-t' + i,
          source: clipInfosFromSource,
          target,
          real_source: [], // real copied imgs data
          real_target: [], // real copied imgs data
          real_sub_flow_mapping_id: [], // real copied img flows mapping ids.
          sub_flow_mapping_id // each source->target ids
        }
      );
    }
    
    this.props.setRandomImageFlows(imageFlows);
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
    sourceImgHandler.onload = function () {
      context.drawImage(sourceImgHandler, 0, 0);

      const {clipInfosFromSource} = self.state;
      clipInfosFromSource.map((item) => {
        context.strokeRect(item.x, item.y, item.width, item.height);
        context.strokeStyle = 'red';
      })
    }
    sourceImgHandler.src = sourceImg;
  }

  startDrawSourceCanvas = () => {
    this.setState({drawSource: true});
    this.props.setSourceCanvas('ready to copy');
  }

  copyAllImageFlow = (focusedImageFlow) => {
    const {imageFlows} = this.props;
    let updatedImageFlows = JSON.parse(JSON.stringify(imageFlows));

    imageFlows.map((o, index) => {
      if (o.flow_mapping_id === focusedImageFlow.flow_mapping_id) {
        updatedImageFlows[index].real_source = imageFlows[index].source;
        updatedImageFlows[index].real_target = imageFlows[index].target;
        updatedImageFlows[index].real_sub_flow_mapping_id = imageFlows[index].sub_flow_mapping_id;
      }
    }) 

    this.props.setRandomImageFlows(updatedImageFlows);
  }

  copyImageFlow = (mapIndex, focusedImageFlow) => {
    const {imageFlows} = this.props;
    let updatedImageFlows = JSON.parse(JSON.stringify(imageFlows));

    imageFlows.map((o, index) => {
      if (!o.real_sub_flow_mapping_id.includes(focusedImageFlow.sub_flow_mapping_id[mapIndex]) && o.flow_mapping_id === focusedImageFlow.flow_mapping_id) {
        updatedImageFlows[index].real_source.push(o.source[mapIndex]);
        updatedImageFlows[index].real_target.push(o.target[mapIndex]);
        updatedImageFlows[index].real_sub_flow_mapping_id.push(o.sub_flow_mapping_id[mapIndex]);
      }
    }) 

    this.props.setRandomImageFlows(updatedImageFlows);
  }

  targetColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const {imageFlows} = this.props;

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
          <CanvasWidget key={rowIndex+'1a'} isTopComment={false} isBorderNeeded={false} imageFlow={imageFlows[rowIndex]} />
        </div>
      </CellMeasurer>
    );
  };

  mappingFlowIdColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const {imageFlows} = this.props;

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
          <a className="copy-btn" onClick={() => this.copyAllImageFlow(imageFlows[rowIndex])}>
            {imageFlows[rowIndex].flow_mapping_id}
          </a>
        </div>
      </CellMeasurer>
    );
  };

  subMappingFlowColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const {imageFlows} = this.props;
    
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
          {
            imageFlows[rowIndex].sub_flow_mapping_id.map((item, mapIndex) => {
              return (
                <div>
                  <a className="copy-btn" onClick={() => this.copyImageFlow(mapIndex, imageFlows[rowIndex])}>
                    {item}
                  </a>
                </div>
              )
            })
          }
        </div>
      </CellMeasurer>
    );
  };

  sourcePositionColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const {imageFlows} = this.props;

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
          {
            imageFlows[rowIndex].source.map((item, idx) => {
              return (
                <div key={'sourcedata' + rowIndex}>
                  <span>x: {item.x} y: {item.y}</span>
                  <br />
                  <span>width: {item.width} height: {item.height}</span>
                </div>
              )
            })
          }
        </div>
      </CellMeasurer>
    );
  };

  targetPositionColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
    const {imageFlows} = this.props;

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
          {
            imageFlows[rowIndex].target.map((item, idx) => {
              return (
                <div key={'targetdata' + rowIndex}>
                  <span>x: {item.x} y: {item.y}</span>
                  <br />
                  <span>width: {item.width} height: {item.height}</span>
                </div>
              )
            })
          }
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const {source_canvas, imageFlows} = this.props;
    const {drawSource} = this.state;

    const listHeight = 600;
    const rowWidth = 1100;

    return (
      <div>
        <div className="action-section">
          <button className="draw-src-canvas" onClick={this.startDrawSourceCanvas}>
            Draw Source Canvas
          </button>
          {
            source_canvas
            ? <button className="generate-image-flows" onClick={this.generateRandomImageFlows}>
                Generate Image Flows
              </button>
            : null
          }
        </div>
        <div className="source-section">
          {
            drawSource
            ? <div className="canv-comp">
                <h5 id="type" className="type">
                  Source Canvas
                </h5>
                <div className="canv-div">
                  <Canvas id="source-canvas" ref="source-canvas" width={90} height={157} draw={this.drawSourceCanvas} />
                </div>
              </div>
            : null
          }
        </div>
        <div>
          <AutoSizer>
            {
              () => {
              return <Table
                        width={rowWidth}
                        height={listHeight}
                        deferredMeasurementCache={cache}
                        headerHeight={20}
                        rowHeight={cache.rowHeight}
                        rowCount={imageFlows.length}
                        rowGetter={({ index }) => imageFlows[index]}
                      >
                        <Column
                          width={200}
                          label='Target Canvas'
                          dataKey='target_canvas'
                          cellRenderer={this.targetColumnCellRenderer}
                        />
                        <Column
                          width={200}
                          label='Flow Mapping Id'
                          dataKey='flow_mapping_id'
                          cellRenderer={this.mappingFlowIdColumnCellRenderer}
                        />
                        <Column
                          width={200}
                          label='Sub Flow Mapping Id'
                          dataKey='sub_flow_mapping_id'
                          cellRenderer={this.subMappingFlowColumnCellRenderer}
                        />
                        <Column
                          width={200}
                          label='Source Data'
                          dataKey='source'
                          cellRenderer={this.sourcePositionColumnCellRenderer}
                        />
                        <Column
                          width={200}
                          label='Target Data'
                          dataKey='target'
                          cellRenderer={this.targetPositionColumnCellRenderer}
                        />
                      </Table>
              }
            }
          </AutoSizer>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    source_canvas: store.canvasRs.source_canvas,
    imageFlows: store.canvasRs.imageFlows
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setSourceCanvas: (sourceCanvas: any) => dispatch({ type: actionTypes.SET_SOURCE_CANVAS, payload: sourceCanvas }),
  setRandomImageFlows: (imageFlows: any) => dispatch({ type: actionTypes.SET_RANDOM_IMAGE_FLOWS, payload: imageFlows })
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(AppContainer);

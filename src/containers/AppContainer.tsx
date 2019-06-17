import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";
import Canvas from 'react-canvas-wrapper';
import CanvasWidget from "../components/CanvasWidget/CanvasWidget";

import { List } from "react-virtualized";

import './AppContainer.css';

import * as sourceImg from '../assets/test.jpg';

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
      list: [
        {name: 'tom', age: 30},
        {name: 'jerry', age: 20},
        {name: 'king', age: 14},
        {name: 'bsan', age: 17},
      ],
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
    for (let i = 0; i < 10; i++) {
      let target: any = [];
      clipInfosFromSource.map((item: any) => {
        let xrand = Math.floor(Math.random() * 90);
        let yrand = Math.floor(Math.random() * 157);
        target.push({
          x: (90 - xrand) >= item.width ? xrand : xrand - item.width,
          y: (157 - yrand) >= item.height ? yrand : yrand - item.height,
          width: item.width,
          height: item.height
        })
      });

      imageFlows.push(
        {
          flow_mapping_id: 'image-flow' + i,
          source_canvas_id: source_canvas.id,
          target_canvas_id: 'canvas-t' + i,
          source: clipInfosFromSource,
          target
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

  renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="image">
          ddd
        </div>
        <div className="content">
          <div>{this.state.list[index].name}</div>
          <div>{this.state.list[index].age}</div>
        </div>
      </div>
    );
  }

  render() {
    let targetsJSX: JSX.Element[] | JSX.Element;
    const {source_canvas} = this.props;
    const {drawSource} = this.state;


    if (!this.props.imageFlows.length) {
      targetsJSX = <p>No Image Flows</p>;
    } else {
      targetsJSX = this.props.imageFlows.map((item, idx) => {
        return (
          <CanvasWidget key={idx+'1'} isTopComment={true} imageFlow={item} />
        );
      });
    }

    const listHeight = 600, rowHeight = 50, rowWidth = 800;

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
        
        <div className="target-section">
          {targetsJSX}
        </div>
        <div className="list-section">
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.state.list.length} />
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

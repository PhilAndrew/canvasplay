import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";
import CanvasWidget from "../components/CanvasWidget/CanvasWidget";

import './AppContainer.css';

interface AppContainerState {
  canvases: string;
}

interface AppContainerProps {
  source_canvas: any;
  imageFlows: any[];
  setSourceCanvas: (sourceCanvas: any) => object;
  setRandomImageFlows: (imageFlows: any) => object;
}

class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  constructor(props: AppContainerProps) {
    super(props);
    this.state = {
      canvases: ""
    };
  }

  generateRandomImageFlows = () => {
    const {source_canvas} = this.props;
    let imageFlows = [];
    for (let i = 0; i < 10; i++) {
      let target: any = [];
      source_canvas.data.map((item: any) => {
        let xrand = Math.floor(Math.random() * 100);
        let yrand = Math.floor(Math.random() * 100);
        target.push({
          x: (100 - xrand) >= item.width ? xrand : xrand - item.width,
          y: (100 - yrand) >= item.height ? yrand : yrand - item.height,
          width: item.width,
          height: item.height,
          color: item.color
        })
      });

      imageFlows.push(
        {
          flow_mapping_id: 'image-flow' + i,
          source_canvas_id: source_canvas.id,
          target_canvas_id: 'canvas-t' + i,
          source: source_canvas.data,
          target
        }
      );
    }
    
    this.props.setRandomImageFlows(imageFlows);
  }

  drawSourceCanvas = () => {
    this.props.setSourceCanvas({
      id: 'source_canv_id1',
      data: [{
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        color: 'red'
      }, {
        x: 20,
        y: 40,
        width: 20,
        height: 30,
        color: 'blue'
      }, {
        x: 50,
        y: 10,
        width: 10,
        height: 40,
        color: 'green'
      }]
    });
  }

  render() {
    let targetsJSX: JSX.Element[] | JSX.Element;
    if (!this.props.imageFlows.length) {
      targetsJSX = <p>No Image Flows</p>;
    } else {
      targetsJSX = this.props.imageFlows.map((item, idx) => {
        return (
          <CanvasWidget type="target" imageFlow={item} />
        );
      });
    }

    const {source_canvas} = this.props;
    console.log('source_canvas: ', source_canvas);

    return (
      <div>
        <div className="action-section">
          <button className="draw-src-canvas" onClick={this.drawSourceCanvas}>
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
            source_canvas.data 
            ? <CanvasWidget type="source" imageFlow={source_canvas.data}></CanvasWidget>
            : null
          }
        </div>
        <div className="target-section">
          {targetsJSX}
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

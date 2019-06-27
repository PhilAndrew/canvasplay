import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from ".MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';

import FrameWidget from "../../components/FrameWidget/FrameWidget";

import { CellMeasurerCache} from "react-virtualized";

import './VideoFrame.css';

import * as sourceImg from '../../assets/frame1.jpg';
import * as sourceImg2 from '../../assets/frame2.jpg';
import * as sourceImg3 from '../../assets/frame3.jpg';

interface VideoFrameState {
  canvases: string;
  drawSource: boolean;
  cell: any;
  frameIndex: any;
}

interface VideoFrameProps {
  videoFrames: any[];
  source_canvas_videoframes: any;
  setRandomVideoFrames: (videoFrames: any) => object;
  setSourceVideoFrame: (sourceCanvas: any) => object;
}

class VideoFrame extends React.Component<VideoFrameProps> {
  
  private cache: CellMeasurerCache;
  private interval: any;
  
  constructor(props: VideoFrameProps) {
    super(props);
    this.state = {
      canvases: "",
      drawSource: false,
      cell: {
        width: 120,
        height: 50
      },
      frameIndex: 0,
      frameImgs: [sourceImg, sourceImg2, sourceImg3]
    };

    const {cell} = this.state;

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: cell.height
    })

    this.initVideoFrameData();

    this.interval = setInterval(()=> {
      let {frameIndex} = this.state;
      this.drawVideoSourceCanvas(frameIndex);

      frameIndex = frameIndex + 1;
      this.setState({frameIndex: frameIndex % 3});
    }, 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initVideoFrameData = () => {
    const {frameImgs} = this.state;
    frameImgs.map((o, idx) => {
      this.generateVideoCells(idx);
    })
  }

  generateVideoCells = (idx) => {
    const {cell} = this.state;
    let {videoFrames} = this.props;

    let cells = [];
    
    const numRows = Math.floor(1024 / cell.height);
    const numCols = Math.floor(1024 / cell.width);

    for (let i = 0; i < numCols; i++) {
      let tempRows = [];
      for (let j = 0; j < numRows; j++) {
        tempRows.push({
          id: 'celltarget' + ((i * numRows) + j),
          index: (i * numRows) + j,
          x: i * cell.width,
          y: j * cell.height,
          width: cell.width,
          height: cell.height,
          frameIndex: idx
        })
      }
      cells.push(tempRows);
    }

    if (videoFrames[idx] === undefined) {
      videoFrames.splice(idx, 0, cells);
    } else {
      videoFrames[idx] = cells;
    }

    this.props.setRandomVideoFrames(videoFrames);
  }

  drawTempCanvas = (idx) => {
    const {frameImgs} = this.state;

    const tempCanvas: any = document.getElementById('vtemp' + idx);
    if (tempCanvas) {
      const tempContext = tempCanvas.getContext('2d');

      let sourceImgHandler = new Image();
      sourceImgHandler.onload = function () {
          tempContext.drawImage(sourceImgHandler, 0, 0);
      }
      sourceImgHandler.src = frameImgs[idx];
    }
  }

  drawVideoSourceCanvas = (idx) => {

    const {frameImgs} = this.state;

    const canvas: any = document.getElementById('videoframe-source-canvas');
    const context = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const width = 1024 * pixelRatio;
    const height = 1024 * pixelRatio;

    context.canvas.width = width;
    context.canvas.height = height;

    let sourceImgHandler = new Image();
    let self = this;
    
    sourceImgHandler.onload = function () {
        context.drawImage(sourceImgHandler, 0, 0); // this mean, server will draw the frame
        self.drawTempCanvas(idx)
        // this mean, when server send the frame with the JSON,  
        // then this function will draw the flow from video canvas -> source canvas(hidden), idx means the flow_mapping_id
    }
    sourceImgHandler.src = frameImgs[idx];
  }

  startDrawSourceCanvas = () => {
    this.props.setSourceVideoFrame('ready to copy');
  }

  render() {
    const {cell, frameImgs} = this.state;
    const {videoFrames} = this.props;

    const listHeight = 600;

    return (
      <div className="page-body">
        <h4 className="page-title">
          VideoFrame
        </h4>
        <div className="source-section">
          <div className="frame-canv-comp">
            <h5 id="type" className="frame-cell-type">
              Source Canvas
            </h5>
            <div className="frame-cell-canv-div">
              <Canvas id="videoframe-source-canvas" ref="videoframe-source-canvas" width={1024} height={1024} /> 
              {
                videoFrames.map((o, i) => {
                  return (<Canvas key={'vtempcanv' + i} className="vtemp" id={'vtemp' + i} ref="vtemp" width={1024} height={1024} />);
                })
              } 
            </div>
          </div>
        </div>
        <div className="frame-container">
          {
            videoFrames.map((o, i) => {
              return (
                    <FrameWidget
                      key={'framewidget' + i}
                      videoFrame={o}
                      frameImg={frameImgs[i]}
                      cell={cell}
                      listHeight={listHeight}
                      cache={this.cache}
                      sourceId={'vtemp' + i}
                    ></FrameWidget>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    videoFrames: store.canvasRs.videoFrames,
    source_canvas_videoframes: store.canvasRs.source_canvas_videoframes
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setRandomVideoFrames: (videoFrames: any) => dispatch({ type: actionTypes.SET_RANDOM_VIDEOFRAME, payload: videoFrames }),
  setSourceVideoFrame: (sourceCanvas: any) => dispatch({ type: actionTypes.SET_SOURCE_CANVAS_VIDEOFRAME, payload: sourceCanvas })
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(VideoFrame);

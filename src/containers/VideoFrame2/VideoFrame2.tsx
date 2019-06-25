import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from ".MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';

import FrameWidget from "../../components/FrameWidget/FrameWidget";
import FrameListForm from "../../components/FrameListForm/FrameListForm";

import { CellMeasurerCache} from "react-virtualized";

import './VideoFrame2.css';

import * as sourceImg from '../../assets/frame1.jpg';
import * as sourceImg2 from '../../assets/frame2.jpg';
import * as sourceImg3 from '../../assets/frame3.jpg';
import * as sourceImg4 from '../../assets/frame4.jpg';
import * as sourceImg5 from '../../assets/frame5.jpg';

interface VideoFrame2State {
  canvases: string;
  drawSource: boolean;
  cell: any;
  frameIndex: any;
}

interface VideoFrame2Props {
  videoFrames2: any[];
  videoFrames2LocationInfo: any[];
  source_canvas_videoframes2: any;
  setRandomVideoFrames2LocationInfo: (videoFrames2LocationInfo: any) => object;
  setRandomVideoFrames2: (videoFrames: any) => object;
  setSourceCanvasVideoFrame2: (sourceCanvas: any) => object;
}

class VideoFrame2 extends React.Component<VideoFrame2Props> {
  
  private cache: CellMeasurerCache;
  private interval: any;
  
  constructor(props: VideoFrame2Props) {
    super(props);
    this.state = {
      canvases: "",
      drawSource: false,
      cell: {
        width: 120,
        height: 50
      },
      frameIndex: 0,
      frameImgs: [sourceImg, sourceImg2, sourceImg3, sourceImg4, sourceImg5]
    };

    const {cell} = this.state;

    this.initVideoFrameData();

    this.interval = setInterval(()=> {
      let {frameIndex} = this.state;
      this.drawVideoSourceCanvas(frameIndex);

      frameIndex = frameIndex + 1;
      this.setState({frameIndex: frameIndex % 5});
    }, 1000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  initVideoFrameData = () => {
    const {frameImgs} = this.state;
    frameImgs.map((o, idx) => {
      this.generateRandomLocationInfo(idx);
    })
  }

  generateRandomLocationInfo = (idx) =>{
    let {videoFrames2LocationInfo} = this.props;
    
    let locationInfo = {
      posX: Math.floor(Math.random() * 400),
      posY: Math.floor(Math.random() * 200),
      width: Math.floor(Math.random() * 500) + 50,
      height: Math.floor(Math.random() * 1000) + 100,
      cellIndex: 0,
      translateZ: 0,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      perspective: 1
    }

    if (videoFrames2LocationInfo[idx] === undefined) {
      videoFrames2LocationInfo.splice(idx, 0, locationInfo);
    } else {
      videoFrames2LocationInfo[idx] = locationInfo;
    }

    // 
    this.generateVideoCells(idx, videoFrames2LocationInfo, locationInfo);
  }

  generateVideoCells = (idx, videoFrames2LocationInfo, locationInfo) => {
    const {cell} = this.state;
    let {videoFrames2} = this.props;

    let cells = [];
    
    const numRows = Math.floor(1024 / locationInfo.height);
    const numCols = Math.floor(1024 / locationInfo.width);

    for (let i = 0; i < numCols; i++) {
      let tempRows = [];
      for (let j = 0; j < numRows; j++) {
        tempRows.push({
          id: 'celltarget' + ((i * numRows) + j),
          index: (i * numRows) + j,
          x: i * locationInfo.width,
          y: j * locationInfo.height,
          width: locationInfo.width,
          height: locationInfo.height,
          frameIndex: idx
        })
      }
      cells.push(tempRows);
    }

    if (videoFrames2[idx] === undefined) {
      videoFrames2.splice(idx, 0, cells);
    } else {
      videoFrames2[idx] = cells;
    }

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: locationInfo.height
    })

    this.props.setRandomVideoFrames2(videoFrames2);
    this.props.setRandomVideoFrames2LocationInfo(videoFrames2LocationInfo);
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

    const canvas: any = document.getElementById('videoframe-source-canvas2');
    const context = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const width = 1024 * pixelRatio;
    const height = 1024 * pixelRatio;

    context.canvas.width = width;
    context.canvas.height = height;

    let sourceImgHandler = new Image();
    let self = this;
    
    sourceImgHandler.onload = function () {
        context.drawImage(sourceImgHandler, 0, 0);
        self.drawTempCanvas(idx)
    }
    sourceImgHandler.src = frameImgs[idx];
  }

  startDrawSourceCanvas = () => {
    this.props.setSourceCanvasVideoFrame2('ready to copy');
  }

  render() {
    const {cell, frameImgs} = this.state;
    const {videoFrames2, videoFrames2LocationInfo} = this.props;

    const listHeight = 600;

    return (
      <div className="page-body video-frame2">
        <h4 className="page-title">
          VideoFrame2
        </h4>
        <div className="source-section">
          <div className="frame-canv-comp">
            {/* <h5 id="type" className="frame-cell-type">
              Source Canvas
            </h5> */}
            <div className="frame-cell-canv-div2">
              <Canvas id="videoframe-source-canvas2" ref="videoframe-source-canvas2" width={1024} height={1024} /> 
              {
                videoFrames2.map((o, i) => {
                  return (<Canvas key={'vtempcanv' + i} className="vtemp" id={'vtemp' + i} ref="vtemp" width={1024} height={1024} />);
                })
              } 
            </div>
          </div>
        </div>
        <FrameListForm></FrameListForm>
        <div className="frame-container2">
          {
            videoFrames2LocationInfo ?
            videoFrames2.map((o, i) => {
              return (
                    <FrameWidget
                      key={'framewidget' + i}
                      videoFrame={o}
                      frameImg={frameImgs[i]}
                      cell={{width: videoFrames2LocationInfo[i].width, height: videoFrames2LocationInfo[i].height}}
                      listHeight={listHeight}
                      cache={this.cache}
                      sourceId={'vtemp' + i}
                      locationInfo={videoFrames2LocationInfo[i]}
                    ></FrameWidget>
              )
            })
            : null
          }
        </div>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    videoFrames2: store.canvasRs.videoFrames2,
    videoFrames2LocationInfo: store.canvasRs.videoFrames2LocationInfo,
    source_canvas_videoframes2: store.canvasRs.source_canvas_videoframes2
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setRandomVideoFrames2: (videoFrames2: any) => dispatch({ type: actionTypes.SET_RANDOM_VIDEOFRAME2, payload: videoFrames2 }),
  setRandomVideoFrames2LocationInfo: (videoFrames2LocationInfo: any) => dispatch({ type: actionTypes.SET_RANDOM_VIDEOFRAME2_LOCATIONINFO, payload: videoFrames2LocationInfo }),
  setSourceCanvasVideoFrame2: (sourceCanvas: any) => dispatch({ type: actionTypes.SET_SOURCE_CANVAS_VIDEOFRAME2, payload: sourceCanvas })
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(VideoFrame2);

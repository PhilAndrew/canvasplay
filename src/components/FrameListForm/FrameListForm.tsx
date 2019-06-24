import React from 'react';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from ".MyTypes";
import { actionTypes } from "../../actions";

import './FrameListForm.css';

interface FrameListFormProps {
    videoFrames2: any[];
    videoFrames2LocationInfo: any[];
    source_canvas_videoframes2: any;
    setRandomVideoFrames2LocationInfo: (videoFrames2LocationInfo: any) => object;
    setRandomVideoFrames2: (videoFrames: any) => object;
    setSourceCanvasVideoFrame2: (sourceCanvas: any) => object;
}

class FrameListForm extends React.Component<FrameListFormProps> {
    constructor(props: FrameListFormProps) {
        super(props);

        const {videoFrames2LocationInfo} = props;

        this.state = {
            listInfo: {
                listIndex: 0,
                ...videoFrames2LocationInfo[0]
            }
        }
    }

    setLocationInfo = () => {
        const {listInfo} = this.state;
        const {videoFrames2LocationInfo} = this.props;

        let updatedLocationInfo = JSON.parse(JSON.stringify(videoFrames2LocationInfo));
        updatedLocationInfo[listInfo.listIndex] = {
            posX: parseInt(listInfo.posX),
            posY: parseInt(listInfo.posY),
            width: parseInt(listInfo.width),
            height: parseInt(listInfo.height),
            cellIndex: parseInt(listInfo.cellIndex)
        }
        this.props.setRandomVideoFrames2LocationInfo(updatedLocationInfo);
    }

    render = () => {
        const {videoFrames2, videoFrames2LocationInfo} = this.props;
        const {listInfo} = this.state;

        return (
            <div className="action-form">
                <div className="form-row">
                    <div className="form-item">
                        <label>Select list</label>
                        <select value={listInfo.listIndex} onChange={(e) => {
                                this.setState({listInfo: {
                                    listIndex: e.target.value,
                                    ...videoFrames2LocationInfo[e.target.value]
                                }});
                            }}>
                            {
                                videoFrames2.map((o, idx) => {
                                    return <option key={'vf2' + idx} value={idx}>List {idx}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Position X</label>
                        <input type="number" value={listInfo.posX} onChange={(e) => {this.setState({listInfo: {...listInfo, posX: e.target.value}})}} />
                    </div>
                    <div className="form-item">
                        <label>Position Y</label>
                        <input type="number" value={listInfo.posY} onChange={(e) => {this.setState({listInfo: {...listInfo, posY: e.target.value}})}} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Width</label>
                        <input type="number" value={listInfo.width} onChange={(e) => {this.setState({listInfo: {...listInfo, width: e.target.value}})}} />
                    </div>
                    <div className="form-item">
                        <label>Height</label>
                        <input type="number" value={listInfo.height} onChange={(e) => {this.setState({listInfo: {...listInfo, height: e.target.value}})}} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Cell Index</label>
                        <input type="number" value={listInfo.cellIndex} onChange={(e) => {this.setState({listInfo: {...listInfo, cellIndex: e.target.value}})}} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <button onClick={this.setLocationInfo}>Submit</button>
                    </div>
                </div>
            </div>
        )
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
)(FrameListForm);


import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './FrameWidget.css';

import CellWidget from "../CellWidget/CellWidget";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column } from "react-virtualized";
import 'react-virtualized/styles.css';

interface FrameWidgetProps {
  videoFrame: any;
  frameImg: any;
  cell: any;
  listHeight: any;
  cache: CellMeasurerCache;
  sourceId: any;
  locationInfo: any;
}

class FrameWidget extends React.Component<FrameWidgetProps> {
    constructor(props: FrameWidgetProps) {
        super(props);
    }

    getVideoFrameDatas = (videoFrame) => {
      let videoFramesData = [];

      for(let i = 0; i < videoFrame.length; i++) {
        for(let j = 0; j < videoFrame[i].length; j++) {
          videoFramesData.push(videoFrame[i][j]);
        }
      }

      return videoFramesData;
    }

    targetColumnCellRenderer = ({dataKey, parent, rowIndex, style}) => {
      const {videoFrame , frameImg, cache, sourceId} = this.props;

      let videoFramesData = this.getVideoFrameDatas(videoFrame);

      return (
        <CellMeasurer
          cache={cache}
          key={dataKey}
          parent={parent}
          style={style}
          rowIndex={rowIndex}>
          <div
            style={{
              whiteSpace: 'normal',
            }}>
            <CellWidget key={'videoFrame' + rowIndex+'1a'} sourceId={sourceId} sourceImg={frameImg} isBorderNeeded={false} cellData={videoFramesData[rowIndex]} />
          </div>
        </CellMeasurer>
      );
    };

    render = () => {
        const {videoFrame, cell, listHeight, cache, locationInfo} = this.props;
        let videoFramesData = this.getVideoFrameDatas(videoFrame);
        const frameCanvasStyle = locationInfo 
          ? { position: 'absolute', 
              transform: 'translateZ('+ locationInfo.translateZ +'px) ' + 
                         'rotateX('+ locationInfo.rotate.x +'deg) ' +
                         'rotateY('+ locationInfo.rotate.y +'deg) ' +
                         'rotateZ('+ locationInfo.rotate.z +'deg) ',
              left: locationInfo.posX+'px',
              top: locationInfo.posY+'px',
              width: locationInfo.width,
              height: locationInfo.height}
          : {width: cell.width + 100}
        
        const fcsStyle = locationInfo
          ? { perspective: locationInfo.perspective + 'em'}
          : {}

        return (
            <div className="fcs-container" style={fcsStyle}>
              <div className="frame-canvas-section" style={frameCanvasStyle}>
                <AutoSizer>
                  {
                    () => {
                    return <Table
                                width={cell.width}
                                height={locationInfo ? locationInfo.height : listHeight}
                                deferredMeasurementCache={cache}
                                headerHeight={20}
                                rowHeight={cache.defaultHeight}
                                rowCount={videoFramesData.length}
                                rowGetter={({ index }) => videoFramesData[index]}
                                scrollToAlignment={'start'}
                                scrollToIndex={locationInfo ? locationInfo.cellIndex : 0}
                              >
                                <Column
                                  width={cell.width}
                                  label={'Frame ' + videoFramesData[0].frameIndex}
                                  dataKey='video_frame'
                                  style={{margin: '0px'}}
                                  cellRenderer={this.targetColumnCellRenderer}
                                />
                              </Table>
                      }
                    }
                </AutoSizer>
              </div>
            </div>
        )
    }
}

export default FrameWidget;


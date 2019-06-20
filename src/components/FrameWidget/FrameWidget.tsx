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

    targetColumnCellRenderer = ({dataKey, parent, rowIndex}) => {
      const {videoFrame , frameImg, cache, sourceId} = this.props;

      let videoFramesData = this.getVideoFrameDatas(videoFrame);

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
            <CellWidget key={'videoFrame' + rowIndex+'1a'} sourceId={sourceId} sourceImg={frameImg} isBorderNeeded={false} cellData={videoFramesData[rowIndex]} />
          </div>
        </CellMeasurer>
      );
    };

    render = () => {
        const {videoFrame, cell, listHeight, cache} = this.props;
        let videoFramesData = this.getVideoFrameDatas(videoFrame);
        const frameCanvasStyle = {width: cell.width + 100}

        return (
            <div className="frame-canvas-section" style={frameCanvasStyle}>
              <AutoSizer>
                {
                  () => {
                  return <Table
                              width={cell.width + 100}
                              height={listHeight}
                              deferredMeasurementCache={cache}
                              headerHeight={20}
                              rowHeight={cache.defaultHeight + 40}
                              rowCount={videoFramesData.length}
                              rowGetter={({ index }) => videoFramesData[index]}
                            >
                              <Column
                                width={cell.width + 100}
                                label={'Video Frame ' + videoFramesData[0].frameIndex}
                                dataKey='video_frame'
                                cellRenderer={this.targetColumnCellRenderer}
                              />
                            </Table>
                    }
                  }
              </AutoSizer>
            </div>
        )
    }
}

export default FrameWidget;


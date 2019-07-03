import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './FrameWidget.css';

import CellWidget from "../CellWidget/CellWidget";

import { AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column, Grid } from "react-virtualized";
import 'react-virtualized/styles.css';

interface FrameWidgetProps {
  videoFrame: any;
  frameImg: any;
  cell: any;
  listHeight: any;
  cache: CellMeasurerCache;
  sourceId: any;
  locationInfo: any;
  layout: any;
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

    listRowRenderer = ({columnIndex, key, rowIndex, style}) => {
      const {videoFrame , frameImg, cache, sourceId} = this.props;

      let videoFramesData = this.getVideoFrameDatas(videoFrame);

      return (
        <div
          style={style}>
            <CellWidget key={'videoFrame' + columnIndex+'1a'} sourceId={sourceId} sourceImg={frameImg} isBorderNeeded={false} cellData={videoFramesData[columnIndex]} />
        </div>
      );
    };

    render = () => {
        const {videoFrame, cell, listHeight, cache, locationInfo, layout} = this.props;
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
          ? locationInfo.isPerspective ? { perspective: locationInfo.perspective + 'em'} : {}
          : {}

        // console.log('layout: ', layout);

        return (
            <div className="fcs-container" style={fcsStyle}>
              <div className="frame-canvas-section" style={frameCanvasStyle}>
                {
                  layout === 'horizontal'
                  ? 
                    <>
                      <h3 className="horizontal-list-label">{'Frame ' + (videoFramesData.length > 0 ? videoFramesData[0].frameIndex : '')}</h3>
                      <Grid
                          width={cell.width}
                          height={cell.height+10}
                          rowHeight={cache.defaultHeight}
                          rowCount={1}
                          columnCount={videoFramesData.length}
                          columnWidth={cell.width}
                          cellRenderer={this.listRowRenderer}
                        >
                      </Grid>
                    </>
                  : <AutoSizer>
                      {
                        () => {
                          return (<Table
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
                                        label={'Frame ' + (videoFramesData.length > 0 ? videoFramesData[0].frameIndex : '')}
                                        dataKey='video_frame'
                                        style={{margin: '0px'}}
                                        cellRenderer={this.targetColumnCellRenderer}
                                      />
                                    </Table>)
                          }
                        }
                    </AutoSizer>
                }
                
                {/*  */}
              </div>
            </div>
        )
    }
}

export default FrameWidget;


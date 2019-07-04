import * as React from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';
import CellWidget from "../../components/CellWidget/CellWidget";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column, Grid } from "react-virtualized";

import 'react-virtualized/styles.css';

import './CellTile.css';

import {findIndex} from 'lodash';

import * as frame1 from '../../assets/frame1.jpg';
import * as frame2 from '../../assets/frame2.jpg';
import * as frame3 from '../../assets/frame3.jpg';
import * as frame4 from '../../assets/frame4.jpg';
import * as frame5 from '../../assets/frame5.jpg';

interface CellTileState {
  canvases: string;
  drawSource: boolean;
  cell: any;
}

interface CellTileProps {
  cellTiles: any[];
  source_canvas_cell: any;
  setRandomCellTiles: (imageFlowsBasic: any) => object;
  setSourceCanvasCell: (sourceCanvas: any) => object;
}

class CellTile extends React.Component<CellTileProps> {
  
  private cache: CellMeasurerCache;
  private rowIndexElement: any;
  
  constructor(props: CellTileProps) {
    super(props);
    this.state = {
      canvases: "",
      drawSource: false,
      cell: {
        width: 120,
        height: 50
      },
      cellDatas: [],
      sourceFrames: [frame1, frame2, frame3, frame4, frame5],
      frameStore: [],
      copiedFrames: [],

      focusedRow: 0,
      tempFocusedRow: 0
    };

    const {cell} = this.state;

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: cell.height
    })

    this.setupServer();
    this.initCellDatas();
  }

  componentDidMount() {
    this.invokeServer('frame0', 'flow0');
    this.forceRender();
  }

  /* fake server */

  invokeServer = (frameIndex, flowId) => {
    const { frameStore, copiedFrames } = this.state;
    let frameData = frameStore.filter(o => o.index === frameIndex)[0];
    this.drawHiddenSourceCanvas(frameData);

    let tempCopiedFrames = JSON.parse(JSON.stringify(copiedFrames));
    tempCopiedFrames.push(frameData)
    this.setState({copiedFrames: tempCopiedFrames});
  }

  setupServer = () => {
    let { frameStore, sourceFrames } = this.state;

    for (let i = 0; i < 5; i++) {
      frameStore.push(
        {
          index: 'frame' + i,
          flow_id: 'flow' + i,
          target_id: 's_target_canvas' + i,
          source_image: sourceFrames[i],
          source_rectangle: {
            x: 0,
            y: 0,
            width: 1000,
            height: 1000
          },
          target_rectangle: {
            x: 0,
            y: 0,
            width: 1000,
            height: 1000
          }        
        }
      )
    }
    this.state = {
      ...this.state,
      frameStore
    }
  }

  /* fake server */

  forceRender = () => {
    setTimeout(() => {
      this.forceUpdate();
    }, 300)
  }

  initCellDatas = () => { // init cell data for all frames
    let cellDatas = [];
    let origCells = this.generateCells(0);
    cellDatas.push(...this.getCellTileDatas(origCells))

    for (let i = 0; i < this.state.sourceFrames.length; i++) {
      let origCells = this.generateCells(i);
      cellDatas.push(...this.getCellTileDatas(origCells))
    }

    this.state = {
      ...this.state,
      cellDatas
    }
  }

  generateCells = (frameIndex) => {
    const {cell} = this.state;

    let cells = [];
    
    const numRows = Math.floor(1024 / cell.height);
    const numCols = Math.floor(1024 / cell.width);

    for (let i = 0; i < numCols; i++) {
      let tempRows = [];
      for (let j = 0; j < numRows; j++) {
        tempRows.push({
          frameIndex,
          x: i * cell.width,
          y: j * cell.height,
          width: cell.width,
          height: cell.height
        })
      }
      cells.push(tempRows);
    }
    return cells;
  }

  getCellTileDatas = (cellTiles) => {
    let cellTilesData = [];
    for(let i = 0; i < cellTiles.length; i++) {
      for(let j = 0; j < cellTiles[i].length; j++) {
        cellTilesData.push(cellTiles[i][j]);
      }
    }
    return cellTilesData;
  }

  drawHiddenSourceCanvas = (data) => {

    const hiddenSourceCanvas: any = document.getElementById(data.target_id);
    const hiddenSourceCanvasContext: any = hiddenSourceCanvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const width = 1024 * pixelRatio;
    const height = 1024 * pixelRatio;

    hiddenSourceCanvasContext.canvas.width = width;
    hiddenSourceCanvasContext.canvas.height = height;

    let sourceImgHandler = new Image();
    sourceImgHandler.onload = function () {
      hiddenSourceCanvasContext.drawImage(
        sourceImgHandler,
        data.source_rectangle.x,
        data.source_rectangle.y,
        data.source_rectangle.width,
        data.source_rectangle.height,
        data.target_rectangle.x,
        data.target_rectangle.y,
        data.target_rectangle.width,
        data.target_rectangle.height,
      );
    }
    sourceImgHandler.src = data.source_image;
  }

  targetColumnCellRenderer = ({dataKey, parent, rowIndex, style}) => {
    const {cellDatas, frameStore, copiedFrames} = this.state;
    let frameData = frameStore.filter(o => o.index === 'frame' + cellDatas[rowIndex].frameIndex)[0];

    let isAvailableToCopy = findIndex(copiedFrames, (o) => { return o.index === ('frame' + cellDatas[rowIndex].frameIndex) });
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}
        style={style}>
        <div
          style={{
            whiteSpace: 'normal',
          }}>
          {
            isAvailableToCopy < 0
            ? 'LOADING...'
            : <CellWidget key={'celltile' + rowIndex+'1a'} sourceId={'s_target_canvas' + cellDatas[rowIndex].frameIndex} sourceImg={frameData.source_image} isBorderNeeded={false} cellData={cellDatas[rowIndex]} />
          }
        </div>
      </CellMeasurer>
    );
  };

  rowRenderEvent = ({overscanStartIndex, overscanStopIndex, startIndex, stopIndex}) => {
    const {cellDatas, copiedFrames} = this.state;
    
    let startFoundIndex = findIndex(copiedFrames, (o) => { return o.index === ('frame' + cellDatas[startIndex].frameIndex) });
    let stopFoundIndex = findIndex(copiedFrames, (o) => { return o.index === ('frame' + cellDatas[stopIndex].frameIndex) });

    if (startFoundIndex < 0 && stopFoundIndex < 0) {
      if (cellDatas[startIndex].frameIndex === cellDatas[stopIndex].frameIndex) {
        this.invokeServer('frame' + cellDatas[startIndex].frameIndex, 'flow' + cellDatas[startIndex].frameIndex)
      } else {
        this.invokeServer('frame' + cellDatas[startIndex].frameIndex, 'flow' + cellDatas[startIndex].frameIndex)
        this.invokeServer('frame' + cellDatas[stopIndex].frameIndex, 'flow' + cellDatas[stopIndex].frameIndex)
      }
    } else {
      if (startFoundIndex < 0) { // not found, require new frame
        this.invokeServer('frame' + cellDatas[startIndex].frameIndex, 'flow' + cellDatas[startIndex].frameIndex)
      }
      if (stopFoundIndex < 0) { // not found, require new frame
        this.invokeServer('frame' + cellDatas[stopIndex].frameIndex, 'flow' + cellDatas[stopIndex].frameIndex)
      }
    }
  }

  focusRow = () => {
    this.setState({focusedRow: parseInt(this.rowIndexElement.value)});
    this.forceRender();
  }

  render() {
    const {sourceFrames, focusedRow, cell, cellDatas} = this.state;
    const listHeight = 600;
    
    return (
      <div className="page-body">
        <h4 className="page-title">
          Cell Pagination
        </h4>
        <div className="source-section">
          <div className="canv-comp">
            {/* <h5 id="type" className="cell-type">
              Source Canvas
            </h5> */}
            <div className="cell-canv-div">
              {/* <Canvas id="s-video-canvas" ref="s-video-canvas" width={1024} height={1024} /> */}
              {
                sourceFrames.map((o, i) => {
                  return (<Canvas key={'s_target_canvas' + i} className="s_target_canvas" id={'s_target_canvas' + i} ref="s_target_canvas" width={1024} height={1024} />);
                })
              } 
            </div>
          </div>
        </div>
        <div className="action-form">
          <div className="form-row">
            <div className="form-item">
              <label>Row Index</label>
              <input type="number" defaultValue={focusedRow} ref={(rowIndexElement) => { this.rowIndexElement = rowIndexElement }} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <button onClick={this.focusRow}>Submit</button>
            </div>
          </div>
        </div>
        <div className="basic-canvas-section" id="basic-canvas-section">
          {
            cellDatas.length > 0
            ? (<AutoSizer>
                {
                  () => {
                  return <Table
                            width={cell.width}
                            height={listHeight}
                            deferredMeasurementCache={this.cache}
                            headerHeight={20}
                            rowHeight={this.cache.defaultHeight}
                            rowCount={cellDatas.length}
                            rowGetter={({ index }) => cellDatas[index]}
                            onRowsRendered={this.rowRenderEvent}
                            scrollToAlignment={'start'}
                            scrollToIndex={focusedRow}
                            onScroll={this.onScrollEvent}
                          >
                            <Column
                              width={cell.width}
                              label='cell_Target Canvas'
                              dataKey='cell_target_canvas'
                              style={{margin: '0px'}}
                              cellRenderer={this.targetColumnCellRenderer}
                            />
                          </Table>
                  }
                }
              </AutoSizer>)
            : null
          }
        </div>
      </div>
    );
  }
}

const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    cellTiles: store.canvasRs.cellTiles,
    source_canvas_cell: store.canvasRs.source_canvas_cell
  };
};

const MapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) => ({
  setRandomCellTiles: (cellTiles: any) => dispatch({ type: actionTypes.SET_RANDOM_CELL_TILES, payload: cellTiles }),
  setSourceCanvasCell: (sourceCanvas: any) => dispatch({ type: actionTypes.SET_SOURCE_CANVAS_CELL, payload: sourceCanvas })
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(CellTile);

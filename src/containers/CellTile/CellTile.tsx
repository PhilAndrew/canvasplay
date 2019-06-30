import * as React from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as MyTypes from "MyTypes";
import { actionTypes } from "../../actions";
import Canvas from 'react-canvas-wrapper';
import CellWidget from "../../components/CellWidget/CellWidget";

import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Table, Column } from "react-virtualized";
import 'react-virtualized/styles.css';

import './CellTile.css';

import * as sourceImg from '../../assets/celltile.jpg';

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
  
  constructor(props: CellTileProps) {
    super(props);
    this.state = {
      canvases: "",
      drawSource: false,
      cell: {
        width: 120,
        height: 50
      }
    };

    const {cell} = this.state;

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: cell.height
    })
  }

  get20KCellData = (cells) => {
    let moreCellData = [];
    let i = 0;
    while (moreCellData.length < 1500) {
      moreCellData.push(cells[i % cells.length]);
      i++;
    }
    
    return moreCellData;
  }

  generateCells = () => {
    const {cell} = this.state;

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
          height: cell.height
        })
      }
      cells.push(tempRows);
    }

    console.log('cells: ', cells);

    cells = this.get20KCellData(cells);

    this.props.setRandomCellTiles(cells);

    setTimeout(() => {
      this.renderCellTile();
    }, 100);
    
  }

  drawSourceCanvas = (canvas: any) => {

    const node = canvas;
    const context = node.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const width = 1024 * pixelRatio;
    const height = 1024 * pixelRatio;

    context.canvas.width = width;
    context.canvas.height = height;

    let sourceImgHandler = new Image();
    let self = this;
    const {source_canvas_cell} = this.props;
    sourceImgHandler.onload = function () {
      if (source_canvas_cell) {
        context.drawImage(sourceImgHandler, 0, 0);
      }
    }
    sourceImgHandler.src = sourceImg;
  }

  startDrawSourceCanvas = () => {
    this.setState({drawSource: true});
    this.props.setSourceCanvasCell('ready to copy');
  }

  getCellTileDatas = () => {
    const {cellTiles} = this.props;
    let cellTilesData = [];

    for(let i = 0; i < cellTiles.length; i++) {
      for(let j = 0; j < cellTiles[i].length; j++) {
        cellTilesData.push(cellTiles[i][j]);
      }
    }

    return cellTilesData;
  }

  targetColumnCellRenderer = ({dataKey, parent, rowIndex, style}) => {
    const {cellTiles} = this.props;
    let cellTilesData = this.getCellTileDatas();

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
          <CellWidget key={'celltile' + rowIndex+'1a'} sourceId="celltile-source-canvas" sourceImg={sourceImg} isBorderNeeded={false} cellData={cellTilesData[rowIndex]} />
        </div>
      </CellMeasurer>
    );
  };

  renderCellTile = () => {

    const {cell} = this.state;
    let cellTilesData = this.getCellTileDatas();
    const listHeight = 600;

    const element = cellTilesData.length > 0
    ? (<AutoSizer>
        {
          () => {
          return <Table
                    width={cell.width}
                    height={listHeight}
                    deferredMeasurementCache={this.cache}
                    headerHeight={20}
                    rowHeight={this.cache.defaultHeight}
                    rowCount={cellTilesData.length}
                    rowGetter={({ index }) => cellTilesData[index]}
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

    ReactDOM.render(element, document.getElementById('basic-canvas-section'));
  }

  render() {
    const {source_canvas_cell} = this.props;
    
    return (
      <div className="page-body">
        <h4 className="page-title">
          Cell Tile (20,000 cell)
        </h4>
        <div className="action-section">
          <button className="draw-src-canvas" onClick={this.startDrawSourceCanvas}>
            Draw Source Canvas
          </button>
          {
            source_canvas_cell
            ? <button className="generate-image-flows" onClick={this.generateCells}>
                Generate Cells
              </button>
            : null
          }
        </div>
        <div className="source-section">
          <div className="canv-comp">
            <h5 id="type" className="cell-type">
              Source Canvas
            </h5>
            <div className="cell-canv-div">
              <Canvas id="celltile-source-canvas" ref="celltile-source-canvas" width={1024} height={1024} draw={this.drawSourceCanvas} /> 
            </div>
          </div>
        </div>
        <div className="basic-canvas-section" id="basic-canvas-section">
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

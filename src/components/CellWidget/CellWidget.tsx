import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './CellWidget.css';

interface CellWidgetProps {
  cellData: any;
  isTopComment: any;
  isBorderNeeded: any;
  sourceImg: any;
  sourceId: any;
}

class CellWidget extends React.Component<CellWidgetProps> {
    constructor(props: CellWidgetProps) {
        super(props);
    }

    draw = (canvas: any) => {
        const node = canvas;
        const targetCanvasContext = node.getContext('2d');
        const {cellData, sourceId} = this.props;

        if (!targetCanvasContext) {
            return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        const width = cellData.width * pixelRatio;
        const height = cellData.height * pixelRatio;

        targetCanvasContext.canvas.width = width;
        targetCanvasContext.canvas.height = height;

        const sourceCanvas: any = document.getElementById(sourceId);

        targetCanvasContext.drawImage(sourceCanvas, 
            cellData.x, 
            cellData.y, 
            cellData.width, 
            cellData.height,
            0,
            0,
            cellData.width,
            cellData.height);
    }

    render = () => {
        const {isTopComment, isBorderNeeded, cellData} = this.props;
        const cttStyle = {width: cellData.width};
        const ccdStyle = {width: cellData.width, height: cellData.height};
        return (
            <div className="cell-canv-comp">
                { 
                    isTopComment
                        ?   <h5 className="cell-target-type" style={cttStyle}>
                                Target ( MappingID: {cellData.id} )
                            </h5>
                        : null
                }
                <div className={isBorderNeeded ? 'cell-canv-div' : 'cell-canv-div no-border'} style={ccdStyle}>
                    <Canvas id={cellData.id} draw={this.draw} />
                </div>
            </div>
        )
    }
}

export default CellWidget;


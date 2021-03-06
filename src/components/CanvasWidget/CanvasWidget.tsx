import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './CanvasWidget.css';

import * as sourceImg from '../../assets/test.jpg';

interface CanvasWidgetProps {
  imageFlow: any;
  isTopComment: any;
  isBorderNeeded: any;
}

class CanvasWidget extends React.Component<CanvasWidgetProps> {
    constructor(props: CanvasWidgetProps) {
        super(props);
    }

    draw = (canvas: any) => {
        const node = canvas;
        const targetCanvasContext = node.getContext('2d');

        const {imageFlow} = this.props;

        if (!targetCanvasContext) {
            return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        const width = 90 * pixelRatio;
        const height = 157 * pixelRatio;

        targetCanvasContext.canvas.width = width;
        targetCanvasContext.canvas.height = height;

        const sourceCanvas: any = document.getElementById('source-canvas');

        imageFlow.real_target.map((rect: any, i: any) => {
            targetCanvasContext.drawImage(sourceCanvas, 
                imageFlow.real_source[i].x, 
                imageFlow.real_source[i].y, 
                imageFlow.real_source[i].width, 
                imageFlow.real_source[i].height,
                rect.x,
                rect.y,
                rect.width,
                rect.height);
        });

    }

    render = () => {
        const {imageFlow, isTopComment, isBorderNeeded} = this.props;
        return (
            <div className="canv-comp">
                { 
                    isTopComment
                        ?   <h5 className="type">
                                Target ( MappingID: {imageFlow.flow_mapping_id} )
                            </h5>
                        : null
                }
                <div className={isBorderNeeded ? 'canv-div' : 'canv-div no-border'}>
                    <Canvas id={imageFlow.flow_mapping_id} draw={this.draw} />
                </div>
            </div>
        )
    }
}

export default CanvasWidget;


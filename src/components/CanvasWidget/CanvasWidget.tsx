import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './CanvasWidget.css';

interface CanvasWidgetProps {
  type: string;
  imageFlow: any;
}

class CanvasWidget extends React.Component<CanvasWidgetProps> {
    constructor(props: CanvasWidgetProps) {
        super(props);

        // this.draw = this.draw.bind(this);
    }

    draw = (canvas: any) => {
        const node = canvas;
        const context = node.getContext('2d');

        const {imageFlow, type} = this.props;

        if (!context) {
            return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        console.log(pixelRatio);
        const width = 100 * pixelRatio;
        const height = 100 * pixelRatio;
        const backgroundColor = 'blue';

        context.canvas.width = width;
        context.canvas.height = height;

        context.clearRect(0, 0, width, height);
        context.beginPath();
        if (type === 'target') {
            imageFlow.target.map((rect: any) => {
                context.fillRect(rect.x, rect.y, rect.width, rect.height);
                context.fillStyle = rect.color;
            })
        } else {
            imageFlow.map((rect: any) => {
                context.fillRect(rect.x, rect.y, rect.width, rect.height);
                context.fillStyle = rect.color;
            })
            
        }
    }

    getId = () => {
        const {imageFlow} = this.props;
        return imageFlow ? imageFlow.type === 'target' ? imageFlow.target_canvas_id : imageFlow.source_canvas_id : 'noone'
    }

    render = () => {
        const {type, imageFlow} = this.props;
        const id = type === 'source' ? 'source-canvid' : imageFlow.target_canvas_id;
        console.log('imgg: ', imageFlow);
        return (
            <div className="canv-comp">
                <h5 className="type">
                    {
                        type === 'source'
                            ? 'Source' 
                            : 'Target' + '( MappingID: ' + imageFlow.flow_mapping_id + ')'
                    }
                </h5>
                <div className="canv-div">
                    <Canvas id={id} draw={this.draw} />
                </div>
            </div>
        )
    }
}

export default CanvasWidget;


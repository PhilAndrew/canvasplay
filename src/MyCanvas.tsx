import Canvas from 'react-canvas-wrapper';
import React from 'react';

class MyCanvas extends React.Component {
    constructor(props: any) {
        super(props);

        this.draw = this.draw.bind(this);
    }

    draw = (canvas: any) => {
        const node = canvas;
        const context = node.getContext('2d');

        if (!context) {
            return;
        }

        const {
            // @ts-ignore
            progress,
        } = this.props;

        const pixelRatio = window.devicePixelRatio || 1;
        const width = 30 * pixelRatio;
        const height = 30 * pixelRatio;
        const backgroundColor = 'green';
        const color = 'black';

        context.clearRect(0, 0, width, height);
        context.fillStyle = backgroundColor;
        context.beginPath();
        context.arc(
            (width / 2),
            (height / 2),
            (width / 2),
            0,
            Math.PI * 2
        );
        context.fill();

        context.fillStyle = color;
        context.beginPath();
        context.arc(
            (width / 2),
            (height / 2),
            ((width * progress) / 2),
            0,
            Math.PI * 2
        );
        context.fill();
    }

    render = () => {
        return (
            <Canvas draw={this.draw} />
        )
    }
}


export default MyCanvas;


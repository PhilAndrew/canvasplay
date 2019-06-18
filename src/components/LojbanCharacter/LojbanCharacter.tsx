import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './LojbanCharacter.css';

interface LojbanCharacterProps {
  word: any;
  borderLength: number;
}

class LojbanCharacter extends React.Component<LojbanCharacterProps> {
    constructor(props: LojbanCharacterProps) {
        super(props);

        // this.draw = this.draw.bind(this);
    }

    characterToBinaryFiveBits = (c) => {
      // a b c d e f g i j k l m n o p r s t u v x y z
      if (c=='a') return '00001';
      if (c=='b') return '00010';
      if (c=='c') return '00011';
      if (c=='d') return '00100'; // 100
      if (c=='e') return '00101';
      if (c=='f') return '00110';
      if (c=='g') return '00111';
      // h is missing
      if (c=='i') return '01000'; // 1000
      if (c=='j') return '01001';
      if (c=='k') return '01010';
      if (c=='l') return '01011';
      if (c=='m') return '01100';
      if (c=='n') return '01101';
      if (c=='o') return '01110';
      if (c=='p') return '01111';
      // q is missing
      if (c=='r') return '10000'; // 10000
      if (c=='s') return '10001';
      if (c=='t') return '10010';
      if (c=='u') return '10011';
      if (c=='v') return '10100';
      // w is missing
      if (c=='x') return '10101';
      if (c=='y') return '10110';
      if (c=='z') return '10111';
      if (c==`'`) return '11000';
      if (c=='.') return '11001';
      if (c==',') return '11010';
      
      return '00000';
    }

    draw = (canvas: any) => {
        const node = canvas;
        const lojbanCanvasContext = node.getContext('2d');

        const {word, borderLength} = this.props;

        if (!lojbanCanvasContext) {
            return;
        }

        const pixelRatio = window.devicePixelRatio || 1;
        const width = borderLength * pixelRatio;
        const height = borderLength * pixelRatio;

        const pix = borderLength / 5;

        lojbanCanvasContext.canvas.width = width;
        lojbanCanvasContext.canvas.height = height;

        for (let i = 0; i < word.length; i++) {
            let fiveBits = this.characterToBinaryFiveBits(word.charAt(i));
            for (let j = 0; j < fiveBits.length; j++) {
                if (fiveBits.charAt(j) === '1') {
                    lojbanCanvasContext.fillStyle = "#000000";
                    lojbanCanvasContext.fillRect(i*pix, j*pix, pix, pix);
                }
            }
        }

    }

    render = () => {
        const {word, borderLength} = this.props;
        const lobjanStyle = {width: borderLength + 'px', height: borderLength + 'px'}
        return (
            <div className="lobjan-div" style={lobjanStyle}>
                <Canvas draw={this.draw} />
            </div>
        )
    }
}

export default LojbanCharacter;


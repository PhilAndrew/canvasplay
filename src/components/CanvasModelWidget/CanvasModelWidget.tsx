
import React from 'react';
import './CanvasModelWidget.css';
import {ImageGraphModel} from "../../models/ImageGraphModel";

interface CanvasModelWidgetProps {
    //imageFlow: any;
}

class CanvasModelWidget extends React.Component<CanvasModelWidgetProps> {

    constructor(props: CanvasModelWidgetProps) {
        super(props);
    }

    createFrom(graph: ImageGraphModel) {
        // @todo this
    }
}

export default CanvasModelWidget;


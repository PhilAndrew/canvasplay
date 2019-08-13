import Canvas from 'react-canvas-wrapper';
import React from 'react';
import './VideoWidget.css';

import Player from '../../assets/libs/Broadway/Player/Player.js';

interface VideoWidgetProps {
  videoSourceName: any;
  mainBodyId: any;
  wsUrl: any;
  width: any;
  height: any;
}

class VideoWidget extends React.Component<VideoWidgetProps> {
    reader = new FileReader();
    sourceBuffer = {};

    framesReceived: number = 0;
    framesRendered: number = 0;

    jpegImg: any;
    ctx: any;

    video: any;

    playerH264: any;

    websocket: any;

    nextFrameId: any;

    constructor(props: VideoWidgetProps) {
        super(props);      
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        const {videoSourceName, mainBodyId} = this.props;

        // cheking for websocket support
        if (window.WebSocket) {
            console.log('do connect');
            this.connectAndCallbacks();
        }
        else
        {
            console.log ("This browser does not support Websocket.");
        }

        this.playerH264 = new Player({
        webgl: false,
        useWorker: true, 
        workerFile: "libs/Broadway/Player/Decoder.js"
        });

        this.playerH264.onRenderFrameComplete = (data: any, width: any, height: any, infos: any, canvasObj: any) => {
            this.framesRendered = this.framesRendered + 1;
            //console.log("Render frame complete");
        };

        let canvasElement = document.getElementById(mainBodyId).appendChild (this.playerH264.canvas)
        canvasElement.setAttribute("id", videoSourceName);
        canvasElement.className = videoSourceName;
        this.playerH264.canvas.style = "-moz-transform: scale(-1, 1); -webkit-transform: scale(1, -1); -o-transform: scale(1, -1); transform: scale(1, -1);";  
    }

    nextFrame = () => {

        this.websocket.send ("NXTFR " + this.framesRendered);
        this.framesRendered = 0;
        this.framesReceived = 0;
        setTimeout(this.nextFrame, 1000); // sent once per second to maintain frame pump
    }

    initSetSocket = () => {
            this.websocket.send ("STVIS");
            setTimeout(this.nextFrame, 60);
    }

    connectAndCallbacks = () => {
        const {wsUrl} = this.props;

        this.websocket		= new WebSocket(wsUrl); 
        const self = this;
        this.websocket.onopen 	= function(evt) { self.onOpen	(evt)	}; 
        this.websocket.onclose 	= function(evt) { self.onClose	(evt)	}; 
        this.websocket.onmessage	= function(evt) { self.onMessage	(evt)	}; 
        this.websocket.onerror 	= function(evt) { self.onError	(evt)	};

        // sets websocket's binary messages as ArrayBuffer type
        // need to check if arraybuffer works for Broadway.cs
        this.websocket.binaryType = "arraybuffer";
    }

    decodeH264 = (frame) => {
        let frameArr = new Uint8Array(frame.data);
        this.playerH264.decode(frameArr);
    }

    onOpen = (evt) => {
        this.initSetSocket();
    }

    onClose = (e) => {
        console.log ("Connection closed", e);
        this.initSetSocket();
        /* this.video.connected = false;
        this.sourceBuffer.remove(0, 10000000); */
    }

    onMessage = (e) => {
        if ((typeof e.data) == "string") {
            this.nextFrameId = e.data;
        }
        else {
            this.framesReceived = this.framesReceived + 1;
            //if (this.nextFrameId == "2")
            this.decodeH264(e);
        }

        //console.log('e message: ', e);    
    }

    onError = (e) => {
	    console.log("Websocket Error: ", e);
    }

    render = () => {
        const {videoSourceName, width, height, mainBodyId} = this.props;
        return (
            <div id={mainBodyId}>
            </div>
        )
    }
}

export default VideoWidget;


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

  h264Compression: boolean;
  h264MP4Compression: boolean;
  jpegCompression: boolean;
  noCompression: boolean;
}

class VideoWidget extends React.Component<VideoWidgetProps> {

    reader = new FileReader();
    sourceBuffer = {};

    jpegImg: any;
    ctx: any;

    video: any;

    playerH264: any;

    websocket: any;

    constructor(props: VideoWidgetProps) {
        super(props);      
    }

    componentDidMount() {
        this.init();  

        setTimeout(() => {
            console.log('will start socket.....');
            this.websocket.send ("STVIS");
	        // stop = false;
        }, 2000);
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
        webgl: true,
        useWorker: true,
        workerFile: "Broadway/Player/Decoder.js"
        });
        //canvas = playerH264.canvas;
        document.getElementById(mainBodyId).appendChild (this.playerH264.canvas).className = videoSourceName;
        this.playerH264.canvas.style = "-moz-transform: scale(-1, 1); -webkit-transform: scale(1, -1); -o-transform: scale(1, -1); transform: scale(1, -1);";  
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
        //console.log (decodeH264);
        this.playerH264.decode(frameArr);
    }

    onOpen = (evt) => {
        const {h264MP4Compression} = this.props

        if(h264MP4Compression)
        {
     // https://stackoverflow.com/a/40238567
        let playPromise = this.video.play();
        if ( playPromise !== undefined) {
                console.log("Got play promise; waiting for fulfilment...");
                playPromise.then(function() 
                {
                    console.log("Play promise fulfilled! Starting playback.");
                    this.video.connected = true;
                    //vframe.width = that.width;
                    //vframe.height = that.height;
                    this.video.currentTime = 0;
                }).catch(function(error) {
                    console.log("Failed to start playback: "+error);
                });
            }        
        }
    }

    onClose = (e) => {
        const {h264MP4Compression} = this.props;
        console.log ("Connection closed", e);
        if (h264MP4Compression)
        {
            this.video.connected = false;
            this.sourceBuffer.remove(0, 10000000);        
        }
    }

    onMessage = (e) => {
        console.log('e message: ', e);
        this.decodeH264(e);
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


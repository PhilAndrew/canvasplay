import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";

interface ITodoModel {
  source_canvas: any;
  source_canvas_basic: any;
  imageFlows: any;
  imageFlowsBasic: any;
  lojbanDatas: any;

  source_canvas_cell: any;
  cellTiles: any;

  source_canvas_videoframes: any;
  videoFrames: any;

  source_canvas_videoframes2: any;
  videoFrames2LocationInfo: any;
  videoFrames2: any;
}

export const initialState: ITodoModel = {
  source_canvas: null,
  source_canvas_basic: null,
  imageFlows: [],
  imageFlowsBasic: [],
  lojbanDatas: [],

  source_canvas_cell: null,
  cellTiles: [],

  source_canvas_videoframes: null,
  videoFrames: [],

  source_canvas_videoframes2: null,
  videoFrames2LocationInfo: [],
  videoFrames2: []
};

export const canvasReducer = (state: ITodoModel = initialState, action: MyTypes.RootAction) => {
  switch (action.type) {

    case actionTypes.SET_SOURCE_CANVAS_VIDEOFRAME2: {
      return {
        ...state,
        source_canvas_videoframes2: action.payload,
      };
    } 
    case actionTypes.SET_RANDOM_VIDEOFRAME2_LOCATIONINFO: {
      return {
        ...state,
        videoFrames2LocationInfo: action.payload,
      };
    } 
    case actionTypes.SET_RANDOM_VIDEOFRAME2: {
      return {
        ...state,
        videoFrames2: action.payload,
      };
    }

    case actionTypes.SET_SOURCE_CANVAS_CELL: {
      return {
        ...state,
        source_canvas_cell: action.payload,
      };
    } 
    case actionTypes.SET_RANDOM_CELL_TILES: {
      return {
        ...state,
        cellTiles: action.payload,
      };
    }

    case actionTypes.SET_SOURCE_CANVAS_VIDEOFRAME: {
      return {
        ...state,
        source_canvas_videoframes: action.payload,
      };
    } 
    case actionTypes.SET_RANDOM_VIDEOFRAME: {
      return {
        ...state,
        videoFrames: action.payload,
      };
    }
    
    case actionTypes.SET_LOJBAN_DATAS: {
      return {
        ...state,
        lojbanDatas: action.payload,
      };
    }
    case actionTypes.SET_RANDOM_IMAGE_FLOWS: {
      return {
        ...state,
        imageFlows: action.payload,
      };
    }
    case actionTypes.SET_RANDOM_IMAGE_FLOWS_FOR_BASIC: {
      return {
        ...state,
        imageFlowsBasic: action.payload,
      };
    }
    case actionTypes.SET_SOURCE_CANVAS: {
      return {
        ...state,
        source_canvas: action.payload,
      };
    }
    case actionTypes.SET_SOURCE_CANVAS_BASIC: {
      return {
        ...state,
        source_canvas_basic: action.payload,
      };
    }
    default:
      return state;
  }
};

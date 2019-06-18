import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";

interface ITodoModel {
  source_canvas: any;
  source_canvas_basic: any;
  imageFlows: any;
  imageFlowsBasic: any;
  lojbanDatas: any;
}

export const initialState: ITodoModel = {
  source_canvas: null,
  source_canvas_basic: null,
  imageFlows: [],
  imageFlowsBasic: [],
  lojbanDatas: []
};

export const canvasReducer = (state: ITodoModel = initialState, action: MyTypes.RootAction) => {
  switch (action.type) {
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

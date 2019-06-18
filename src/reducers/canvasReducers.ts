import * as MyTypes from "MyTypes";
import { actionTypes } from "../actions";

interface ITodoModel {
  source_canvas: any;
  imageFlows: any;
}

export const initialState: ITodoModel = {
  source_canvas: null,
  imageFlows: []
};

export const canvasReducer = (state: ITodoModel = initialState, action: MyTypes.RootAction) => {
  switch (action.type) {
    case actionTypes.SET_RANDOM_IMAGE_FLOWS: {
      return {
        ...state,
        imageFlows: action.payload,
      };
    }
    case actionTypes.SET_SOURCE_CANVAS: {
      console.log('action.payload: ', action.payload);
      return {
        ...state,
        source_canvas: action.payload,
      };
    }
    default:
      return state;
  }
};

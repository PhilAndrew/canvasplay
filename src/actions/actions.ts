import { action } from "typesafe-actions";

// use typescript enum rather than action constants
export enum actionTypes {
  SET_RANDOM_IMAGE_FLOWS = "SET_RANDOM_IMAGE_FLOWS",
  SET_RANDOM_IMAGE_FLOWS_FOR_BASIC = "SET_RANDOM_IMAGE_FLOWS_FOR_BASIC",
  SET_SOURCE_CANVAS = "SET_SOURCE_CANVAS",
  SET_SOURCE_CANVAS_BASIC = "SET_SOURCE_CANVAS_BASIC",
  SET_LOJBAN_DATAS = "SET_LOJBAN_DATAS"
}

export const canvasActions = {
  setRandomImageFlows: (imageFlows: any) => action(actionTypes.SET_RANDOM_IMAGE_FLOWS, imageFlows),
  setRandomImageFlowsBasic: (imageFlows: any) => action(actionTypes.SET_RANDOM_IMAGE_FLOWS_FOR_BASIC, imageFlows),
  setSourceCanvas: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS, sourceCanvas),
  setSourceCanvasBasic: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS_BASIC, sourceCanvas),
  setLojbanDatas: (lojbanDatas: any) => action(actionTypes.SET_LOJBAN_DATAS, lojbanDatas)
};

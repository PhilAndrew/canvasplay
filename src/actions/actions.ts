import { action } from "typesafe-actions";

// use typescript enum rather than action constants
export enum actionTypes {
  SET_RANDOM_IMAGE_FLOWS = "SET_RANDOM_IMAGE_FLOWS",
  SET_RANDOM_IMAGE_FLOWS_FOR_BASIC = "SET_RANDOM_IMAGE_FLOWS_FOR_BASIC",
  SET_SOURCE_CANVAS = "SET_SOURCE_CANVAS",
  SET_SOURCE_CANVAS_BASIC = "SET_SOURCE_CANVAS_BASIC",
  SET_LOJBAN_DATAS = "SET_LOJBAN_DATAS",

  SET_RANDOM_CELL_TILES = "SET_RANDOM_CELL_TILES",
  SET_SOURCE_CANVAS_CELL = "SET_SOURCE_CANVAS_CELL",

  SET_RANDOM_VIDEOFRAME = "SET_RANDOM_VIDEOFRAME",
  SET_SOURCE_CANVAS_VIDEOFRAME = "SET_SOURCE_CANVAS_VIDEOFRAME"
}

export const canvasActions = {
  setRandomImageFlows: (imageFlows: any) => action(actionTypes.SET_RANDOM_IMAGE_FLOWS, imageFlows),
  setRandomImageFlowsBasic: (imageFlows: any) => action(actionTypes.SET_RANDOM_IMAGE_FLOWS_FOR_BASIC, imageFlows),
  setSourceCanvas: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS, sourceCanvas),
  setSourceCanvasBasic: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS_BASIC, sourceCanvas),
  setLojbanDatas: (lojbanDatas: any) => action(actionTypes.SET_LOJBAN_DATAS, lojbanDatas),

  setRandomCellTiles: (cellTiles: any) => action(actionTypes.SET_RANDOM_CELL_TILES, cellTiles),
  setSourceCanvasCell: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS_CELL, sourceCanvas),

  setRandomVideoFrames: (videoFrames: any) => action(actionTypes.SET_RANDOM_VIDEOFRAME, videoFrames),
  setSourceCanvasVideoFrame: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS_VIDEOFRAME, sourceCanvas)
};

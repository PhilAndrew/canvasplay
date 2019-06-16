import { action } from "typesafe-actions";

// use typescript enum rather than action constants
export enum actionTypes {
  SET_RANDOM_IMAGE_FLOWS = "SET_RANDOM_IMAGE_FLOWS",
  SET_SOURCE_CANVAS = "SET_SOURCE_CANVAS"
}

export const canvasActions = {
  setRandomImageFlows: (imageFlows: any) => action(actionTypes.SET_RANDOM_IMAGE_FLOWS, imageFlows),
  setSourceCanvas: (sourceCanvas: any) => action(actionTypes.SET_SOURCE_CANVAS, sourceCanvas)
};

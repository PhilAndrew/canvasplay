import { combineReducers } from "redux";
import { canvasReducer } from "./canvasReducers";

const rootReducer = combineReducers({
  canvasRs: canvasReducer
});

export default rootReducer;

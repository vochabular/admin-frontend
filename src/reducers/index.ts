import { combineReducers } from "redux";

import contentEditor from "./contentEditorSlice";

const rootReducer = combineReducers({
  contentEditor
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

import { createSlice, PayloadAction } from "redux-starter-kit";

import { Role } from "../rbac-rules";
import { getChapterById_chapter_components } from "../queries/__generated__/getChapterById";

export type SelectedComponent = getChapterById_chapter_components | undefined;

export interface IContentEditorState {
  /**
   * The current editors role. Typically, a user will only have one. But those with multiple roles may want to switch quickly the context of the editor.
   */
  editorRole: Role;
  /**
   * The current selected component
   */
  selectedComponent: SelectedComponent;
}

const initialState: IContentEditorState = {
  editorRole: Role.VIEWER,
  selectedComponent: undefined
};

export const { actions, reducer } = createSlice({
  slice: "content-editor",
  initialState,
  reducers: {
    setEditorRole(
      state: IContentEditorState,
      { payload }: PayloadAction<Role>
    ) {
      state.editorRole = payload;
    },
    setSelectedComponent(
      state: IContentEditorState,
      { payload }: PayloadAction<SelectedComponent>
    ) {
      state.selectedComponent = payload;
    }
  }
});

export default reducer;

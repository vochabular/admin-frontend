import { createSlice, PayloadAction } from "redux-starter-kit";

import { Role } from "../rbac-rules";
import { subscribeChapterById_chapter_components } from "../queries/__generated__/subscribeChapterById";

export type SelectedComponent =
  | subscribeChapterById_chapter_components
  | undefined;

export interface IContentEditorState {
  /**
   * The id of the selected sub-chapter
   */
  currentChapterId: string | undefined;
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
  currentChapterId: undefined,
  editorRole: Role.VIEWER,
  selectedComponent: undefined
};

export const { actions, reducer } = createSlice({
  slice: "content-editor",
  initialState,
  reducers: {
    setCurrentChapter(
      state: IContentEditorState,
      { payload }: PayloadAction<string>
    ) {
      state.currentChapterId = payload;
    },
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

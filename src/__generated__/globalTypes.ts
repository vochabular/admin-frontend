/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum ProfileLanguage {
  DE = "DE",
  EN = "EN",
}

/**
 * unique or primary key constraints on table "api_chapter"
 */
export enum api_chapter_constraint {
  api_chapter_pkey = "api_chapter_pkey",
  api_chapter_titleCH_key = "api_chapter_titleCH_key",
  api_chapter_titleDE_key = "api_chapter_titleDE_key",
  api_chapter_titleDE_number_ffcac7a1_uniq = "api_chapter_titleDE_number_ffcac7a1_uniq",
}

/**
 * unique or primary key constraints on table "api_chapter_languages"
 */
export enum api_chapter_languages_constraint {
  api_chapter_languages_chapter_id_language_id_27c00225_uniq = "api_chapter_languages_chapter_id_language_id_27c00225_uniq",
  api_chapter_languages_pkey = "api_chapter_languages_pkey",
}

/**
 * update columns of table "api_chapter_languages"
 */
export enum api_chapter_languages_update_column {
  chapter_id = "chapter_id",
  id = "id",
  language_id = "language_id",
}

/**
 * update columns of table "api_chapter"
 */
export enum api_chapter_update_column {
  created = "created",
  description = "description",
  fk_belongs_to_id = "fk_belongs_to_id",
  id = "id",
  number = "number",
  titleCH = "titleCH",
  titleDE = "titleDE",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_comment"
 */
export enum api_comment_constraint {
  api_comment_pkey = "api_comment_pkey",
}

/**
 * update columns of table "api_comment"
 */
export enum api_comment_update_column {
  active = "active",
  context = "context",
  created = "created",
  fk_author_id = "fk_author_id",
  fk_component_id = "fk_component_id",
  fk_parent_comment_id = "fk_parent_comment_id",
  id = "id",
  text = "text",
  updated = "updated",
  written = "written",
}

/**
 * unique or primary key constraints on table "api_component"
 */
export enum api_component_constraint {
  api_component_pkey = "api_component_pkey",
}

/**
 * update columns of table "api_component"
 */
export enum api_component_update_column {
  created = "created",
  data = "data",
  fk_chapter_id = "fk_chapter_id",
  fk_component_id = "fk_component_id",
  fk_component_type_id = "fk_component_type_id",
  fk_locked_by_id = "fk_locked_by_id",
  id = "id",
  locked_ts = "locked_ts",
  state = "state",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_componenttype"
 */
export enum api_componenttype_constraint {
  api_componenttype_pkey = "api_componenttype_pkey",
}

/**
 * update columns of table "api_componenttype"
 */
export enum api_componenttype_update_column {
  base = "base",
  created = "created",
  fk_parent_type_id = "fk_parent_type_id",
  icon = "icon",
  id = "id",
  label = "label",
  name = "name",
  schema = "schema",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_language"
 */
export enum api_language_constraint {
  api_language_pkey = "api_language_pkey",
}

/**
 * update columns of table "api_language"
 */
export enum api_language_update_column {
  code = "code",
  created = "created",
  id = "id",
  name = "name",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_profile"
 */
export enum api_profile_constraint {
  api_profile_pkey = "api_profile_pkey",
  api_profile_user_id_key = "api_profile_user_id_key",
}

/**
 * update columns of table "api_profile"
 */
export enum api_profile_update_column {
  created = "created",
  current_role = "current_role",
  event_notifications = "event_notifications",
  firstname = "firstname",
  id = "id",
  language = "language",
  lastname = "lastname",
  roles = "roles",
  setup_completed = "setup_completed",
  translator_languages = "translator_languages",
  updated = "updated",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "api_text"
 */
export enum api_text_constraint {
  api_text_master_translation_id_key = "api_text_master_translation_id_key",
  api_text_pkey = "api_text_pkey",
}

/**
 * update columns of table "api_text"
 */
export enum api_text_update_column {
  created = "created",
  fk_component_id = "fk_component_id",
  id = "id",
  master_translation_id = "master_translation_id",
  translatable = "translatable",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_translation"
 */
export enum api_translation_constraint {
  api_translation_fk_language_id_fk_text_id_807318e5_uniq = "api_translation_fk_language_id_fk_text_id_807318e5_uniq",
  api_translation_pkey = "api_translation_pkey",
}

/**
 * update columns of table "api_translation"
 */
export enum api_translation_update_column {
  created = "created",
  fk_language_id = "fk_language_id",
  fk_text_id = "fk_text_id",
  id = "id",
  text_field = "text_field",
  updated = "updated",
  valid = "valid",
}

/**
 * unique or primary key constraints on table "api_word"
 */
export enum api_word_constraint {
  api_word_pkey = "api_word_pkey",
}

/**
 * update columns of table "api_word"
 */
export enum api_word_update_column {
  created = "created",
  id = "id",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_wordgroup"
 */
export enum api_wordgroup_constraint {
  api_wordgroup_pkey = "api_wordgroup_pkey",
}

/**
 * update columns of table "api_wordgroup"
 */
export enum api_wordgroup_update_column {
  created = "created",
  fk_chapter_id = "fk_chapter_id",
  id = "id",
  title_ch = "title_ch",
  title_de = "title_de",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_wordgroup_words"
 */
export enum api_wordgroup_words_constraint {
  api_wordgroup_words_pkey = "api_wordgroup_words_pkey",
  api_wordgroup_words_wordgroup_id_word_id_aebfaecb_uniq = "api_wordgroup_words_wordgroup_id_word_id_aebfaecb_uniq",
}

/**
 * update columns of table "api_wordgroup_words"
 */
export enum api_wordgroup_words_update_column {
  id = "id",
  word_id = "word_id",
  wordgroup_id = "wordgroup_id",
}

/**
 * unique or primary key constraints on table "api_wordtranslation"
 */
export enum api_wordtranslation_constraint {
  api_wordtranslation_pkey = "api_wordtranslation_pkey",
}

/**
 * update columns of table "api_wordtranslation"
 */
export enum api_wordtranslation_update_column {
  audio = "audio",
  created = "created",
  example_sentence = "example_sentence",
  fk_language_id = "fk_language_id",
  id = "id",
  text = "text",
  updated = "updated",
  word_id = "word_id",
}

export interface ChapterInput {
  description: string;
  fkBelongsToId?: string | null;
  languages: string;
  number: number;
  titleCH: string;
  titleDE: string;
}

export interface IntroduceChapterInput {
  chapterData?: ChapterInput | null;
  clientMutationId?: string | null;
}

export interface ProfileInput {
  currentRole?: string | null;
  eventNotifications?: boolean | null;
  firstname?: string | null;
  language?: string | null;
  lastname?: string | null;
  roles?: string | null;
  setupCompleted?: boolean | null;
  translatorLanguages?: string | null;
}

export interface UpdateProfileInput {
  clientMutationId?: string | null;
  profileData?: ProfileInput | null;
  username?: string | null;
}

/**
 * input type for inserting array relation for remote table "api_chapter"
 */
export interface api_chapter_arr_rel_insert_input {
  data: api_chapter_insert_input[];
  on_conflict?: api_chapter_on_conflict | null;
}

/**
 * input type for inserting data into table "api_chapter"
 */
export interface api_chapter_insert_input {
  components?: api_component_arr_rel_insert_input | null;
  created?: any | null;
  description?: string | null;
  fk_belongs_to_id?: any | null;
  id?: any | null;
  languages?: api_chapter_languages_arr_rel_insert_input | null;
  number?: number | null;
  parentChapter?: api_chapter_obj_rel_insert_input | null;
  subChapters?: api_chapter_arr_rel_insert_input | null;
  titleCH?: string | null;
  titleDE?: string | null;
  updated?: any | null;
  wordgroups?: api_wordgroup_arr_rel_insert_input | null;
}

/**
 * input type for inserting array relation for remote table "api_chapter_languages"
 */
export interface api_chapter_languages_arr_rel_insert_input {
  data: api_chapter_languages_insert_input[];
  on_conflict?: api_chapter_languages_on_conflict | null;
}

/**
 * input type for inserting data into table "api_chapter_languages"
 */
export interface api_chapter_languages_insert_input {
  chapter_id?: any | null;
  id?: number | null;
  language?: api_language_obj_rel_insert_input | null;
  language_id?: any | null;
}

/**
 * on conflict condition type for table "api_chapter_languages"
 */
export interface api_chapter_languages_on_conflict {
  constraint: api_chapter_languages_constraint;
  update_columns: api_chapter_languages_update_column[];
}

/**
 * input type for inserting object relation for remote table "api_chapter"
 */
export interface api_chapter_obj_rel_insert_input {
  data: api_chapter_insert_input;
  on_conflict?: api_chapter_on_conflict | null;
}

/**
 * on conflict condition type for table "api_chapter"
 */
export interface api_chapter_on_conflict {
  constraint: api_chapter_constraint;
  update_columns: api_chapter_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_comment"
 */
export interface api_comment_arr_rel_insert_input {
  data: api_comment_insert_input[];
  on_conflict?: api_comment_on_conflict | null;
}

/**
 * input type for inserting data into table "api_comment"
 */
export interface api_comment_insert_input {
  active?: boolean | null;
  answers?: api_comment_arr_rel_insert_input | null;
  author?: api_profile_obj_rel_insert_input | null;
  component?: api_component_obj_rel_insert_input | null;
  context?: string | null;
  created?: any | null;
  fk_author_id?: any | null;
  fk_component_id?: any | null;
  fk_parent_comment_id?: any | null;
  id?: any | null;
  parentComment?: api_comment_obj_rel_insert_input | null;
  text?: string | null;
  updated?: any | null;
  written?: any | null;
}

/**
 * input type for inserting object relation for remote table "api_comment"
 */
export interface api_comment_obj_rel_insert_input {
  data: api_comment_insert_input;
  on_conflict?: api_comment_on_conflict | null;
}

/**
 * on conflict condition type for table "api_comment"
 */
export interface api_comment_on_conflict {
  constraint: api_comment_constraint;
  update_columns: api_comment_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_component"
 */
export interface api_component_arr_rel_insert_input {
  data: api_component_insert_input[];
  on_conflict?: api_component_on_conflict | null;
}

/**
 * input type for inserting data into table "api_component"
 */
export interface api_component_insert_input {
  chapter?: api_chapter_obj_rel_insert_input | null;
  comments?: api_comment_arr_rel_insert_input | null;
  componentType?: api_componenttype_obj_rel_insert_input | null;
  created?: any | null;
  data?: string | null;
  fk_chapter_id?: any | null;
  fk_component_id?: any | null;
  fk_component_type_id?: any | null;
  fk_locked_by_id?: any | null;
  id?: any | null;
  lockedByUser?: api_profile_obj_rel_insert_input | null;
  locked_ts?: any | null;
  parentComponent?: api_component_obj_rel_insert_input | null;
  state?: string | null;
  texts?: api_text_arr_rel_insert_input | null;
  updated?: any | null;
}

/**
 * input type for inserting object relation for remote table "api_component"
 */
export interface api_component_obj_rel_insert_input {
  data: api_component_insert_input;
  on_conflict?: api_component_on_conflict | null;
}

/**
 * on conflict condition type for table "api_component"
 */
export interface api_component_on_conflict {
  constraint: api_component_constraint;
  update_columns: api_component_update_column[];
}

/**
 * input type for inserting data into table "api_componenttype"
 */
export interface api_componenttype_insert_input {
  base?: boolean | null;
  created?: any | null;
  fk_parent_type_id?: any | null;
  icon?: string | null;
  id?: any | null;
  label?: string | null;
  name?: string | null;
  schema?: string | null;
  updated?: any | null;
}

/**
 * input type for inserting object relation for remote table "api_componenttype"
 */
export interface api_componenttype_obj_rel_insert_input {
  data: api_componenttype_insert_input;
  on_conflict?: api_componenttype_on_conflict | null;
}

/**
 * on conflict condition type for table "api_componenttype"
 */
export interface api_componenttype_on_conflict {
  constraint: api_componenttype_constraint;
  update_columns: api_componenttype_update_column[];
}

/**
 * input type for inserting data into table "api_language"
 */
export interface api_language_insert_input {
  code?: string | null;
  created?: any | null;
  id?: any | null;
  name?: string | null;
  updated?: any | null;
}

/**
 * input type for inserting object relation for remote table "api_language"
 */
export interface api_language_obj_rel_insert_input {
  data: api_language_insert_input;
  on_conflict?: api_language_on_conflict | null;
}

/**
 * on conflict condition type for table "api_language"
 */
export interface api_language_on_conflict {
  constraint: api_language_constraint;
  update_columns: api_language_update_column[];
}

/**
 * input type for inserting data into table "api_profile"
 */
export interface api_profile_insert_input {
  created?: any | null;
  current_role?: string | null;
  event_notifications?: boolean | null;
  firstname?: string | null;
  id?: any | null;
  language?: string | null;
  lastname?: string | null;
  roles?: string | null;
  setup_completed?: boolean | null;
  translator_languages?: string | null;
  updated?: any | null;
  user_id?: number | null;
}

/**
 * input type for inserting object relation for remote table "api_profile"
 */
export interface api_profile_obj_rel_insert_input {
  data: api_profile_insert_input;
  on_conflict?: api_profile_on_conflict | null;
}

/**
 * on conflict condition type for table "api_profile"
 */
export interface api_profile_on_conflict {
  constraint: api_profile_constraint;
  update_columns: api_profile_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_text"
 */
export interface api_text_arr_rel_insert_input {
  data: api_text_insert_input[];
  on_conflict?: api_text_on_conflict | null;
}

/**
 * input type for inserting data into table "api_text"
 */
export interface api_text_insert_input {
  created?: any | null;
  fk_component_id?: any | null;
  id?: any | null;
  master_translation_id?: any | null;
  translatable?: boolean | null;
  translations?: api_translation_arr_rel_insert_input | null;
  updated?: any | null;
}

/**
 * on conflict condition type for table "api_text"
 */
export interface api_text_on_conflict {
  constraint: api_text_constraint;
  update_columns: api_text_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_translation"
 */
export interface api_translation_arr_rel_insert_input {
  data: api_translation_insert_input[];
  on_conflict?: api_translation_on_conflict | null;
}

/**
 * input type for inserting data into table "api_translation"
 */
export interface api_translation_insert_input {
  created?: any | null;
  fk_language_id?: any | null;
  fk_text_id?: any | null;
  id?: any | null;
  text_field?: string | null;
  updated?: any | null;
  valid?: boolean | null;
}

/**
 * on conflict condition type for table "api_translation"
 */
export interface api_translation_on_conflict {
  constraint: api_translation_constraint;
  update_columns: api_translation_update_column[];
}

/**
 * input type for inserting data into table "api_word"
 */
export interface api_word_insert_input {
  created?: any | null;
  id?: any | null;
  translations?: api_wordtranslation_arr_rel_insert_input | null;
  updated?: any | null;
  wordgroup?: api_wordgroup_words_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "api_word"
 */
export interface api_word_obj_rel_insert_input {
  data: api_word_insert_input;
  on_conflict?: api_word_on_conflict | null;
}

/**
 * on conflict condition type for table "api_word"
 */
export interface api_word_on_conflict {
  constraint: api_word_constraint;
  update_columns: api_word_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_wordgroup"
 */
export interface api_wordgroup_arr_rel_insert_input {
  data: api_wordgroup_insert_input[];
  on_conflict?: api_wordgroup_on_conflict | null;
}

/**
 * input type for inserting data into table "api_wordgroup"
 */
export interface api_wordgroup_insert_input {
  created?: any | null;
  fk_chapter_id?: any | null;
  id?: any | null;
  title_ch?: string | null;
  title_de?: string | null;
  updated?: any | null;
  words?: api_wordgroup_words_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "api_wordgroup"
 */
export interface api_wordgroup_obj_rel_insert_input {
  data: api_wordgroup_insert_input;
  on_conflict?: api_wordgroup_on_conflict | null;
}

/**
 * on conflict condition type for table "api_wordgroup"
 */
export interface api_wordgroup_on_conflict {
  constraint: api_wordgroup_constraint;
  update_columns: api_wordgroup_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_wordgroup_words"
 */
export interface api_wordgroup_words_arr_rel_insert_input {
  data: api_wordgroup_words_insert_input[];
  on_conflict?: api_wordgroup_words_on_conflict | null;
}

/**
 * input type for inserting data into table "api_wordgroup_words"
 */
export interface api_wordgroup_words_insert_input {
  id?: number | null;
  word?: api_word_obj_rel_insert_input | null;
  word_id?: any | null;
  wordgroup?: api_wordgroup_obj_rel_insert_input | null;
  wordgroup_id?: any | null;
}

/**
 * on conflict condition type for table "api_wordgroup_words"
 */
export interface api_wordgroup_words_on_conflict {
  constraint: api_wordgroup_words_constraint;
  update_columns: api_wordgroup_words_update_column[];
}

/**
 * input type for inserting array relation for remote table "api_wordtranslation"
 */
export interface api_wordtranslation_arr_rel_insert_input {
  data: api_wordtranslation_insert_input[];
  on_conflict?: api_wordtranslation_on_conflict | null;
}

/**
 * input type for inserting data into table "api_wordtranslation"
 */
export interface api_wordtranslation_insert_input {
  audio?: string | null;
  created?: any | null;
  example_sentence?: string | null;
  fk_language_id?: any | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  text?: string | null;
  updated?: any | null;
  word?: api_word_obj_rel_insert_input | null;
  word_id?: any | null;
}

/**
 * on conflict condition type for table "api_wordtranslation"
 */
export interface api_wordtranslation_on_conflict {
  constraint: api_wordtranslation_constraint;
  update_columns: api_wordtranslation_update_column[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================

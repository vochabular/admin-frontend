/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "api_chapter"
 */
export enum api_chapter_constraint {
  api_chapter_pkey = "api_chapter_pkey",
}

/**
 * update columns of table "api_chapter"
 */
export enum api_chapter_update_column {
  created = "created",
  description = "description",
  fk_belongs_to_id = "fk_belongs_to_id",
  fk_book_id = "fk_book_id",
  id = "id",
  number = "number",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_chaptertitle"
 */
export enum api_chaptertitle_constraint {
  api_chaptertitle_pkey = "api_chaptertitle_pkey",
}

/**
 * update columns of table "api_chaptertitle"
 */
export enum api_chaptertitle_update_column {
  chapter_id = "chapter_id",
  created = "created",
  id = "id",
  language_id = "language_id",
  title = "title",
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
  fk_chapter_id = "fk_chapter_id",
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
  order_in_chapter = "order_in_chapter",
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
  fk_frontend_widget_id = "fk_frontend_widget_id",
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
  created = "created",
  id = "id",
  name = "name",
  updated = "updated",
}

/**
 * unique or primary key constraints on table "api_media"
 */
export enum api_media_constraint {
  api_media_pkey = "api_media_pkey",
}

/**
 * update columns of table "api_media"
 */
export enum api_media_update_column {
  created = "created",
  fk_component_id = "fk_component_id",
  id = "id",
  type = "type",
  updated = "updated",
  url = "url",
}

/**
 * unique or primary key constraints on table "api_profile"
 */
export enum api_profile_constraint {
  api_profile_pkey = "api_profile_pkey",
  api_profile_user_id_key = "api_profile_user_id_key",
}

/**
 * unique or primary key constraints on table "api_profile_translator_languages"
 */
export enum api_profile_translator_languages_constraint {
  api_profile_translator_l_profile_id_language_id_54b48cc3_uniq = "api_profile_translator_l_profile_id_language_id_54b48cc3_uniq",
  api_profile_translator_languages_pkey = "api_profile_translator_languages_pkey",
}

/**
 * update columns of table "api_profile_translator_languages"
 */
export enum api_profile_translator_languages_update_column {
  id = "id",
  language_id = "language_id",
  profile_id = "profile_id",
}

/**
 * update columns of table "api_profile"
 */
export enum api_profile_update_column {
  created = "created",
  current_role = "current_role",
  event_notifications = "event_notifications",
  firstname = "firstname",
  fk_language_id = "fk_language_id",
  id = "id",
  lastname = "lastname",
  roles = "roles",
  setup_completed = "setup_completed",
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
 * unique or primary key constraints on table "api_wordgrouptitle"
 */
export enum api_wordgrouptitle_constraint {
  api_wordgrouptitle_pkey = "api_wordgrouptitle_pkey",
}

/**
 * update columns of table "api_wordgrouptitle"
 */
export enum api_wordgrouptitle_update_column {
  created = "created",
  id = "id",
  language_id = "language_id",
  title = "title",
  updated = "updated",
  wordGroup_id = "wordGroup_id",
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

/**
 * expression to compare columns of type Boolean. All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * expression to compare columns of type Int. All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
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

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
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
 * Boolean expression to filter rows from the table "api_chapter". All fields are combined with a logical 'AND'.
 */
export interface api_chapter_bool_exp {
  _and?: (api_chapter_bool_exp | null)[] | null;
  _not?: api_chapter_bool_exp | null;
  _or?: (api_chapter_bool_exp | null)[] | null;
  comments?: api_comment_bool_exp | null;
  components?: api_component_bool_exp | null;
  created?: timestamptz_comparison_exp | null;
  description?: String_comparison_exp | null;
  fk_belongs_to_id?: uuid_comparison_exp | null;
  fk_book_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  languages?: api_chaptertitle_bool_exp | null;
  number?: Int_comparison_exp | null;
  parentChapter?: api_chapter_bool_exp | null;
  subChapters?: api_chapter_bool_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_chapter"
 */
export interface api_chapter_insert_input {
  comments?: api_comment_arr_rel_insert_input | null;
  components?: api_component_arr_rel_insert_input | null;
  created?: any | null;
  description?: string | null;
  fk_belongs_to_id?: any | null;
  fk_book_id?: any | null;
  id?: any | null;
  languages?: api_chaptertitle_arr_rel_insert_input | null;
  number?: number | null;
  parentChapter?: api_chapter_obj_rel_insert_input | null;
  subChapters?: api_chapter_arr_rel_insert_input | null;
  updated?: any | null;
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
  where?: api_chapter_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_chaptertitle"
 */
export interface api_chaptertitle_arr_rel_insert_input {
  data: api_chaptertitle_insert_input[];
  on_conflict?: api_chaptertitle_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_chaptertitle". All fields are combined with a logical 'AND'.
 */
export interface api_chaptertitle_bool_exp {
  _and?: (api_chaptertitle_bool_exp | null)[] | null;
  _not?: api_chaptertitle_bool_exp | null;
  _or?: (api_chaptertitle_bool_exp | null)[] | null;
  chapter_id?: uuid_comparison_exp | null;
  created?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  language?: api_language_bool_exp | null;
  language_id?: String_comparison_exp | null;
  title?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_chaptertitle"
 */
export interface api_chaptertitle_insert_input {
  chapter_id?: any | null;
  created?: any | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  language_id?: string | null;
  title?: string | null;
  updated?: any | null;
}

/**
 * on conflict condition type for table "api_chaptertitle"
 */
export interface api_chaptertitle_on_conflict {
  constraint: api_chaptertitle_constraint;
  update_columns: api_chaptertitle_update_column[];
  where?: api_chaptertitle_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_comment"
 */
export interface api_comment_arr_rel_insert_input {
  data: api_comment_insert_input[];
  on_conflict?: api_comment_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_comment". All fields are combined with a logical 'AND'.
 */
export interface api_comment_bool_exp {
  _and?: (api_comment_bool_exp | null)[] | null;
  _not?: api_comment_bool_exp | null;
  _or?: (api_comment_bool_exp | null)[] | null;
  active?: Boolean_comparison_exp | null;
  answers?: api_comment_bool_exp | null;
  author?: api_profile_bool_exp | null;
  component?: api_component_bool_exp | null;
  context?: String_comparison_exp | null;
  created?: timestamptz_comparison_exp | null;
  fk_author_id?: uuid_comparison_exp | null;
  fk_chapter_id?: uuid_comparison_exp | null;
  fk_component_id?: uuid_comparison_exp | null;
  fk_parent_comment_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  parentComment?: api_comment_bool_exp | null;
  text?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
  written?: timestamptz_comparison_exp | null;
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
  fk_chapter_id?: any | null;
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
  where?: api_comment_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_component"
 */
export interface api_component_arr_rel_insert_input {
  data: api_component_insert_input[];
  on_conflict?: api_component_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_component". All fields are combined with a logical 'AND'.
 */
export interface api_component_bool_exp {
  _and?: (api_component_bool_exp | null)[] | null;
  _not?: api_component_bool_exp | null;
  _or?: (api_component_bool_exp | null)[] | null;
  chapter?: api_chapter_bool_exp | null;
  children?: api_component_bool_exp | null;
  comments?: api_comment_bool_exp | null;
  created?: timestamptz_comparison_exp | null;
  data?: jsonb_comparison_exp | null;
  fk_chapter_id?: uuid_comparison_exp | null;
  fk_component_id?: uuid_comparison_exp | null;
  fk_component_type_id?: uuid_comparison_exp | null;
  fk_locked_by_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  lockedBy?: api_profile_bool_exp | null;
  locked_ts?: timestamptz_comparison_exp | null;
  media?: api_media_bool_exp | null;
  order_in_chapter?: Int_comparison_exp | null;
  state?: String_comparison_exp | null;
  texts?: api_text_bool_exp | null;
  type?: api_componenttype_bool_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_component"
 */
export interface api_component_insert_input {
  chapter?: api_chapter_obj_rel_insert_input | null;
  children?: api_component_arr_rel_insert_input | null;
  comments?: api_comment_arr_rel_insert_input | null;
  created?: any | null;
  data?: any | null;
  fk_chapter_id?: any | null;
  fk_component_id?: any | null;
  fk_component_type_id?: any | null;
  fk_locked_by_id?: any | null;
  id?: any | null;
  lockedBy?: api_profile_obj_rel_insert_input | null;
  locked_ts?: any | null;
  media?: api_media_arr_rel_insert_input | null;
  order_in_chapter?: number | null;
  state?: string | null;
  texts?: api_text_arr_rel_insert_input | null;
  type?: api_componenttype_obj_rel_insert_input | null;
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
  where?: api_component_bool_exp | null;
}

/**
 * input type for updating data in table "api_component"
 */
export interface api_component_set_input {
  created?: any | null;
  data?: any | null;
  fk_chapter_id?: any | null;
  fk_component_id?: any | null;
  fk_component_type_id?: any | null;
  fk_locked_by_id?: any | null;
  id?: any | null;
  locked_ts?: any | null;
  order_in_chapter?: number | null;
  state?: string | null;
  updated?: any | null;
}

/**
 * input type for inserting array relation for remote table "api_componenttype"
 */
export interface api_componenttype_arr_rel_insert_input {
  data: api_componenttype_insert_input[];
  on_conflict?: api_componenttype_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_componenttype". All fields are combined with a logical 'AND'.
 */
export interface api_componenttype_bool_exp {
  _and?: (api_componenttype_bool_exp | null)[] | null;
  _not?: api_componenttype_bool_exp | null;
  _or?: (api_componenttype_bool_exp | null)[] | null;
  base?: Boolean_comparison_exp | null;
  children?: api_componenttype_bool_exp | null;
  created?: timestamptz_comparison_exp | null;
  fk_frontend_widget_id?: uuid_comparison_exp | null;
  fk_parent_type_id?: uuid_comparison_exp | null;
  frontendWidget?: api_componenttype_bool_exp | null;
  icon?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  label?: String_comparison_exp | null;
  name?: String_comparison_exp | null;
  schema?: jsonb_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_componenttype"
 */
export interface api_componenttype_insert_input {
  base?: boolean | null;
  children?: api_componenttype_arr_rel_insert_input | null;
  created?: any | null;
  fk_frontend_widget_id?: any | null;
  fk_parent_type_id?: any | null;
  frontendWidget?: api_componenttype_obj_rel_insert_input | null;
  icon?: string | null;
  id?: any | null;
  label?: string | null;
  name?: string | null;
  schema?: any | null;
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
  where?: api_componenttype_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "api_language". All fields are combined with a logical 'AND'.
 */
export interface api_language_bool_exp {
  _and?: (api_language_bool_exp | null)[] | null;
  _not?: api_language_bool_exp | null;
  _or?: (api_language_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  id?: String_comparison_exp | null;
  name?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_language"
 */
export interface api_language_insert_input {
  created?: any | null;
  id?: string | null;
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
  where?: api_language_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_media"
 */
export interface api_media_arr_rel_insert_input {
  data: api_media_insert_input[];
  on_conflict?: api_media_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_media". All fields are combined with a logical 'AND'.
 */
export interface api_media_bool_exp {
  _and?: (api_media_bool_exp | null)[] | null;
  _not?: api_media_bool_exp | null;
  _or?: (api_media_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  fk_component_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  type?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
  url?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_media"
 */
export interface api_media_insert_input {
  created?: any | null;
  fk_component_id?: any | null;
  id?: any | null;
  type?: string | null;
  updated?: any | null;
  url?: string | null;
}

/**
 * on conflict condition type for table "api_media"
 */
export interface api_media_on_conflict {
  constraint: api_media_constraint;
  update_columns: api_media_update_column[];
  where?: api_media_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "api_profile". All fields are combined with a logical 'AND'.
 */
export interface api_profile_bool_exp {
  _and?: (api_profile_bool_exp | null)[] | null;
  _not?: api_profile_bool_exp | null;
  _or?: (api_profile_bool_exp | null)[] | null;
  comments?: api_comment_bool_exp | null;
  created?: timestamptz_comparison_exp | null;
  current_role?: String_comparison_exp | null;
  event_notifications?: Boolean_comparison_exp | null;
  firstname?: String_comparison_exp | null;
  fk_language_id?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  language?: api_language_bool_exp | null;
  lastname?: String_comparison_exp | null;
  roles?: String_comparison_exp | null;
  setup_completed?: Boolean_comparison_exp | null;
  translatorLanguages?: api_profile_translator_languages_bool_exp | null;
  updated?: timestamptz_comparison_exp | null;
  user_id?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_profile"
 */
export interface api_profile_insert_input {
  comments?: api_comment_arr_rel_insert_input | null;
  created?: any | null;
  current_role?: string | null;
  event_notifications?: boolean | null;
  firstname?: string | null;
  fk_language_id?: string | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  lastname?: string | null;
  roles?: string | null;
  setup_completed?: boolean | null;
  translatorLanguages?: api_profile_translator_languages_arr_rel_insert_input | null;
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
  where?: api_profile_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_profile_translator_languages"
 */
export interface api_profile_translator_languages_arr_rel_insert_input {
  data: api_profile_translator_languages_insert_input[];
  on_conflict?: api_profile_translator_languages_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table
 * "api_profile_translator_languages". All fields are combined with a logical 'AND'.
 */
export interface api_profile_translator_languages_bool_exp {
  _and?: (api_profile_translator_languages_bool_exp | null)[] | null;
  _not?: api_profile_translator_languages_bool_exp | null;
  _or?: (api_profile_translator_languages_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  language?: api_language_bool_exp | null;
  language_id?: String_comparison_exp | null;
  profile?: api_profile_bool_exp | null;
  profile_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_profile_translator_languages"
 */
export interface api_profile_translator_languages_insert_input {
  id?: number | null;
  language?: api_language_obj_rel_insert_input | null;
  language_id?: string | null;
  profile?: api_profile_obj_rel_insert_input | null;
  profile_id?: any | null;
}

/**
 * on conflict condition type for table "api_profile_translator_languages"
 */
export interface api_profile_translator_languages_on_conflict {
  constraint: api_profile_translator_languages_constraint;
  update_columns: api_profile_translator_languages_update_column[];
  where?: api_profile_translator_languages_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_text"
 */
export interface api_text_arr_rel_insert_input {
  data: api_text_insert_input[];
  on_conflict?: api_text_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_text". All fields are combined with a logical 'AND'.
 */
export interface api_text_bool_exp {
  _and?: (api_text_bool_exp | null)[] | null;
  _not?: api_text_bool_exp | null;
  _or?: (api_text_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  fk_component_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  masterTranslation?: api_translation_bool_exp | null;
  master_translation_id?: uuid_comparison_exp | null;
  translatable?: Boolean_comparison_exp | null;
  translations?: api_translation_bool_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_text"
 */
export interface api_text_insert_input {
  created?: any | null;
  fk_component_id?: any | null;
  id?: any | null;
  masterTranslation?: api_translation_obj_rel_insert_input | null;
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
  where?: api_text_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_translation"
 */
export interface api_translation_arr_rel_insert_input {
  data: api_translation_insert_input[];
  on_conflict?: api_translation_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_translation". All fields are combined with a logical 'AND'.
 */
export interface api_translation_bool_exp {
  _and?: (api_translation_bool_exp | null)[] | null;
  _not?: api_translation_bool_exp | null;
  _or?: (api_translation_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  fk_language_id?: String_comparison_exp | null;
  fk_text_id?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  language?: api_language_bool_exp | null;
  text_field?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
  valid?: Boolean_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_translation"
 */
export interface api_translation_insert_input {
  created?: any | null;
  fk_language_id?: string | null;
  fk_text_id?: any | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  text_field?: string | null;
  updated?: any | null;
  valid?: boolean | null;
}

/**
 * input type for inserting object relation for remote table "api_translation"
 */
export interface api_translation_obj_rel_insert_input {
  data: api_translation_insert_input;
  on_conflict?: api_translation_on_conflict | null;
}

/**
 * on conflict condition type for table "api_translation"
 */
export interface api_translation_on_conflict {
  constraint: api_translation_constraint;
  update_columns: api_translation_update_column[];
  where?: api_translation_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "api_word". All fields are combined with a logical 'AND'.
 */
export interface api_word_bool_exp {
  _and?: (api_word_bool_exp | null)[] | null;
  _not?: api_word_bool_exp | null;
  _or?: (api_word_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  translations?: api_wordtranslation_bool_exp | null;
  updated?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_word"
 */
export interface api_word_insert_input {
  created?: any | null;
  id?: any | null;
  translations?: api_wordtranslation_arr_rel_insert_input | null;
  updated?: any | null;
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
  where?: api_word_bool_exp | null;
}

/**
 * input type for inserting data into table "api_wordgroup"
 */
export interface api_wordgroup_insert_input {
  chapter?: api_chapter_obj_rel_insert_input | null;
  created?: any | null;
  fk_chapter_id?: any | null;
  id?: any | null;
  titles?: api_wordgrouptitle_arr_rel_insert_input | null;
  updated?: any | null;
  words?: api_wordgroup_words_arr_rel_insert_input | null;
}

/**
 * input type for inserting array relation for remote table "api_wordgroup_words"
 */
export interface api_wordgroup_words_arr_rel_insert_input {
  data: api_wordgroup_words_insert_input[];
  on_conflict?: api_wordgroup_words_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_wordgroup_words". All fields are combined with a logical 'AND'.
 */
export interface api_wordgroup_words_bool_exp {
  _and?: (api_wordgroup_words_bool_exp | null)[] | null;
  _not?: api_wordgroup_words_bool_exp | null;
  _or?: (api_wordgroup_words_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  word?: api_word_bool_exp | null;
  word_id?: uuid_comparison_exp | null;
  wordgroup_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_wordgroup_words"
 */
export interface api_wordgroup_words_insert_input {
  id?: number | null;
  word?: api_word_obj_rel_insert_input | null;
  word_id?: any | null;
  wordgroup_id?: any | null;
}

/**
 * on conflict condition type for table "api_wordgroup_words"
 */
export interface api_wordgroup_words_on_conflict {
  constraint: api_wordgroup_words_constraint;
  update_columns: api_wordgroup_words_update_column[];
  where?: api_wordgroup_words_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_wordgrouptitle"
 */
export interface api_wordgrouptitle_arr_rel_insert_input {
  data: api_wordgrouptitle_insert_input[];
  on_conflict?: api_wordgrouptitle_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_wordgrouptitle". All fields are combined with a logical 'AND'.
 */
export interface api_wordgrouptitle_bool_exp {
  _and?: (api_wordgrouptitle_bool_exp | null)[] | null;
  _not?: api_wordgrouptitle_bool_exp | null;
  _or?: (api_wordgrouptitle_bool_exp | null)[] | null;
  created?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  language?: api_language_bool_exp | null;
  language_id?: String_comparison_exp | null;
  title?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
  wordGroup_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_wordgrouptitle"
 */
export interface api_wordgrouptitle_insert_input {
  created?: any | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  language_id?: string | null;
  title?: string | null;
  updated?: any | null;
  wordGroup_id?: any | null;
}

/**
 * on conflict condition type for table "api_wordgrouptitle"
 */
export interface api_wordgrouptitle_on_conflict {
  constraint: api_wordgrouptitle_constraint;
  update_columns: api_wordgrouptitle_update_column[];
  where?: api_wordgrouptitle_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "api_wordtranslation"
 */
export interface api_wordtranslation_arr_rel_insert_input {
  data: api_wordtranslation_insert_input[];
  on_conflict?: api_wordtranslation_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "api_wordtranslation". All fields are combined with a logical 'AND'.
 */
export interface api_wordtranslation_bool_exp {
  _and?: (api_wordtranslation_bool_exp | null)[] | null;
  _not?: api_wordtranslation_bool_exp | null;
  _or?: (api_wordtranslation_bool_exp | null)[] | null;
  audio?: String_comparison_exp | null;
  created?: timestamptz_comparison_exp | null;
  example_sentence?: String_comparison_exp | null;
  fk_language_id?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  language?: api_language_bool_exp | null;
  text?: String_comparison_exp | null;
  updated?: timestamptz_comparison_exp | null;
  word_id?: uuid_comparison_exp | null;
}

/**
 * input type for inserting data into table "api_wordtranslation"
 */
export interface api_wordtranslation_insert_input {
  audio?: string | null;
  created?: any | null;
  example_sentence?: string | null;
  fk_language_id?: string | null;
  id?: any | null;
  language?: api_language_obj_rel_insert_input | null;
  text?: string | null;
  updated?: any | null;
  word_id?: any | null;
}

/**
 * on conflict condition type for table "api_wordtranslation"
 */
export interface api_wordtranslation_on_conflict {
  constraint: api_wordtranslation_constraint;
  update_columns: api_wordtranslation_update_column[];
  where?: api_wordtranslation_bool_exp | null;
}

/**
 * expression to compare columns of type jsonb. All fields are combined with logical 'AND'.
 */
export interface jsonb_comparison_exp {
  _contained_in?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _has_key?: string | null;
  _has_keys_all?: string[] | null;
  _has_keys_any?: string[] | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * expression to compare columns of type uuid. All fields are combined with logical 'AND'.
 */
export interface uuid_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

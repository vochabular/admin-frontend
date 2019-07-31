/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum CommentContext {
  A = "A",
  C = "C",
  I = "I",
  T = "T",
}

/**
 * An enumeration.
 */
export enum ProfileLanguage {
  DE = "DE",
  EN = "EN",
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

export interface CommentInput {
  active: boolean;
  context?: string | null;
  fkAuthorId: string;
  fkComponentId: string;
  fkParentCommentId?: string | null;
  text: string;
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

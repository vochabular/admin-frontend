/**
 * Contains Role Based Access Control (RBAC) rules
 * Insipired by: https://auth0.com/blog/role-based-access-control-rbac-and-react-apps/
 */

/**
 * Role constants
 * TODO(df): Should get the roles defined from Django via Auth0 Management API!
 */
export enum Role {
  ADMINISTRATOR = "administrator",
  APPROVER = "approver",
  CONTENT_CREATOR = "creator-creator",
  TRANSLATOR = "translator",
  VIEWER = "viewer"
}

/**
 * Permission constants
 * Note the "syntax" with the double __ as a seperator between resource and verb
 */
export enum Permission {
  // Overall Pages
  DASHBOARD_PAGE__VISIT = "dashboard:pageVisit",
  CHAPTERS_PAGE__VISIT = "chapters:pageVisit",
  WORD_GROUP__VISIT = "wordGroup:pageVisit",
  // Views
  CHAPTERS__QUERY = "chapters:query",
  CHAPTER_CONTENT__QUERY = "chapterContent:query",
  CHAPTER_CONTENT_COMMENTS__QUERY = "chapterContentComments:query",
  WORD_GROUP__QUERY = "wordGroup:query",
  // Actions
  CHAPTER__CREATE = "chapter:create",
  CHAPTER_CONTENT__CREATE = "chapterContent:create",
  CHAPTER_CONTENT__EDIT = "chapterContent:edit",
  CHAPTER_CONTENT_COMMENT__CREATE = "chapterContentComment:create",
  CHAPTER_CONTENT_COMMENT__DELETE = "chapterContentComment:delete"
}

export interface IRule {
  static?: Permission[];
  dynamic?: any; // TODO(df): Type
}

export type TRules<R> = { [key in keyof typeof Role]: R };

const rules: TRules<IRule> = {
  // TODO(df): Or should we by default assume that the administrator can do everything?
  ADMINISTRATOR: {
    // Administrator has ALL permissions...
    static: Object.values(Permission)
  },
  APPROVER: {
    static: [
      Permission.DASHBOARD_PAGE__VISIT,
      Permission.CHAPTERS_PAGE__VISIT,
      Permission.WORD_GROUP__VISIT,
      Permission.CHAPTERS__QUERY,
      Permission.CHAPTER_CONTENT__QUERY,
      Permission.CHAPTER_CONTENT_COMMENTS__QUERY,
      Permission.WORD_GROUP__QUERY,
      Permission.CHAPTER_CONTENT_COMMENT__CREATE
    ],
    dynamic: {
      CHAPTER_CONTENT_COMMENT__DELETE: ({ userId, commentUserId }: any) => {
        if (!userId || !commentUserId) return false;
        return userId === commentUserId;
      }
    }
  },
  CONTENT_CREATOR: {
    static: [
      Permission.DASHBOARD_PAGE__VISIT,
      Permission.CHAPTERS_PAGE__VISIT,
      Permission.WORD_GROUP__VISIT,
      Permission.CHAPTERS__QUERY,
      Permission.CHAPTER_CONTENT__QUERY,
      Permission.CHAPTER_CONTENT__CREATE,
      Permission.CHAPTER_CONTENT__EDIT,
      Permission.CHAPTER_CONTENT_COMMENTS__QUERY,
      Permission.WORD_GROUP__QUERY,
      Permission.CHAPTER_CONTENT_COMMENT__CREATE
    ],
    dynamic: {
      CHAPTER_CONTENT_COMMENT__DELETE: ({ userId, commentUserId }: any) => {
        if (!userId || !commentUserId) return false;
        return userId === commentUserId;
      }
    }
  },
  TRANSLATOR: {
    static: [
      Permission.DASHBOARD_PAGE__VISIT,
      Permission.CHAPTERS_PAGE__VISIT,
      Permission.WORD_GROUP__VISIT,
      Permission.CHAPTERS__QUERY,
      Permission.CHAPTER_CONTENT__QUERY,
      Permission.WORD_GROUP__QUERY
    ]
  },
  VIEWER: {
    static: [Permission.DASHBOARD_PAGE__VISIT]
  }
};

export default rules;

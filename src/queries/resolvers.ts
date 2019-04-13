import gql from "graphql-tag";

import { GET_SETTINGS } from "./settings";
import auth0Client from "src/auth/Auth";
import i18n from "src/i18n";

export const typeDefs = gql`
  extend type Query {
    settings: Settings!
  }

  extend type Settings {
    userName: string
    currentRole: string
    language: string
    translatorLanguages: [string]
    receiveEventNotifications: boolean
    hasCompletedSetup: boolean
  }

  extend type Mutation {
    updateSettings(settings: Settings): Settings
  }
`;

export const resolvers = {
  Query: {
    getSettings: (_: any, params: any, { cache }: any) => {
      cache.readQuery({ query: GET_SETTINGS });
    }
  },
  Mutation: {
    updateSettings: (_: any, { settings }: any, { cache }: any) => {
      // TODO: Set current role and set language

      cache.writeQuery({
        query: GET_SETTINGS,
        data: { settings: { ...settings } }
      });
      return settings;
    }
  }
};

import gql from "graphql-tag";

const CHARACTER_FRAGMENT = gql`
  fragment CharacterParts on api_character {
    id
    formalName: formal_name
    informalName: informal_name
    speaker
    gender
    book {
      id
    }
  }
`;

// TODO: Would have to query by book...
export const GET_ALL_CHARACTERS = gql`
  subscription getCharacters {
    characters: api_character {
      ...CharacterParts
    }
  }
  ${CHARACTER_FRAGMENT}
`;

export const GET_CHARACTERS_BY_IDS = gql`
  subscription getCharacters($ids: [uuid!]!) {
    api_character(where: { id: { _in: $ids } }) {
      ...CharacterParts
    }
  }
`;

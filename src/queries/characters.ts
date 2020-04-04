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
  subscription getAllCharacters {
    characters: api_character {
      ...CharacterParts
    }
  }
  ${CHARACTER_FRAGMENT}
`;

export const GET_CHARACTERS_BY_IDS = gql`
  subscription getCharactersByIds($ids: [uuid!]!) {
    characters: api_character(where: { id: { _in: $ids } }) {
      ...CharacterParts
    }
  }
  ${CHARACTER_FRAGMENT}
`;

export const GET_CHARACTER_BY_ID = gql`
  subscription getCharacterById($id: uuid!) {
    character: api_character_by_pk(id: $id) {
      ...CharacterParts
    }
  }
  ${CHARACTER_FRAGMENT}
`;

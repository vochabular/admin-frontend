export enum EditStates {
  C = "C", // creation
  R = "R", // in review
  U = "U", // to be updated
  T = "T", // to be translated
  F = "F", // final
}

export const EDIT_STATES_COLORS: { [key in EditStates]: string } = {
  C: "#9b6a6c",
  R: "#554348",
  U: "#077187",
  T: "#337357",
  F: "#6d9f71",
};

/**
 * Converts a global id back to the "original" id
 * @param id
 */
export function convertGlobalToDb(id: string) {
  return atob(id).split(":")[1];
}

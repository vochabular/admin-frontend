/**
 * Converts a global id back to the "original" id
 * @param id
 */
export function convertGlobalToDbId(id: string) {
  return atob(id).split(":")[1];
}

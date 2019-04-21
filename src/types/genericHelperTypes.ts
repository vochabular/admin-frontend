// If you want to "remove" a property from a type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

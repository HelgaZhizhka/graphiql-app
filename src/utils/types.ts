export type Writable<T> = {
  -readonly [P in keyof T]: Writable<T[P]>;
};

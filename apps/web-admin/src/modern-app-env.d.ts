/// <reference types='@modern-js/app-tools/types' />

type Optional<T> = {
  [P in keyof T]?: T[P];
};

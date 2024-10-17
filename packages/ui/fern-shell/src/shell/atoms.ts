import { atom, createStore } from "jotai";
import type { OpenAPI3 } from "openapi-typescript";

export const store = createStore();

export const openapiAtom = atom<Record<string, OpenAPI3>>({});

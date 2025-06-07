import { parseAsString, createLoader, parseAsArrayOf } from "nuqs/server";

export const params = {
  objectTypes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
};

export const loadProductFilters = createLoader(params);

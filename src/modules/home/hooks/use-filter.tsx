import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";

export const params = {
  objectTypes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
};

export const useFilters = () => {
  return useQueryStates(params);
};

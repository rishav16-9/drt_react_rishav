import { useQueryStates, parseAsString, parseAsArrayOf } from "nuqs";

// const DEFAULT_OBJECT_TYPES = ["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"];
const DEFAULT_ATTRIBUTES = ["noradCatId", "intlDes", "name", "orbitCode", "objectType", "countryCode", "launchDate"];

export const params = {
  objectTypes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: false })
    .withDefault([]),

  attributes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: false })
    .withDefault(DEFAULT_ATTRIBUTES),

  query: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),

  orbitCodes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: false })
    .withDefault([]),
};

export const useFilters = () => {
  return useQueryStates(params);
};

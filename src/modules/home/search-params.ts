import { parseAsString, createLoader, parseAsArrayOf } from "nuqs/server";

// const DEFAULT_OBJECT_TYPES = ["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"];
const DEFAULT_ATTRIBUTES = [
  "noradCatId",
  "intlDes",
  "name",
  "orbitCode",
  "objectType",
  "countryCode",
  "launchDate",
];

export const params = {
  objectTypes: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ clearOnDefault: false }),

  attributes: parseAsArrayOf(parseAsString)
    .withDefault(DEFAULT_ATTRIBUTES)
    .withOptions({ clearOnDefault: false }),

  query: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  orbitCodes: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: false })
    .withDefault([]),
};

export const loadProductFilters = createLoader(params);

import { isValidIPv4 } from "../shared/validation.js";
import { parseIPv4, parsePrefix, prefixFromNetmask } from "./helpers.js";

const valid = (value) => ({ valid: true, value, message: "" });
const invalid = (message) => ({ valid: false, message, value: null });

/** Pure validators return structured results so UIs can present errors consistently. */
export function validateIPv4(value) {
  return isValidIPv4(value)
    ? valid(parseIPv4(value))
    : invalid("Enter a valid IPv4 address, for example 192.168.1.42.");
}

export function validatePrefix(value) {
  const prefix = parsePrefix(value);
  return prefix === null ? invalid("Enter a prefix from /0 to /32.") : valid(prefix);
}

export function validateNetmask(value) {
  const prefix = prefixFromNetmask(value);
  return prefix === null ? invalid("Enter a contiguous netmask, for example 255.255.255.0.") : valid(prefix);
}

export function validateCalculationInput(addressValue, prefixValue) {
  const fields = {
    address: validateIPv4(addressValue),
    prefix: validatePrefix(prefixValue)
  };
  const errors = Object.fromEntries(
    Object.entries(fields)
      .filter(([, result]) => !result.valid)
      .map(([field, result]) => [field, result.message])
  );

  if (Object.keys(errors).length) {
    return { valid: false, value: null, fields, errors, message: Object.values(errors)[0] };
  }

  return {
    valid: true,
    value: { octets: fields.address.value, prefix: fields.prefix.value },
    fields,
    errors: {},
    message: ""
  };
}

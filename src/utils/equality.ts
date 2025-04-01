/**
 * Compares two objects to check if they have the same keys and values.
 * The function checks if both objects have the same number of keys and if the values
 * assigned to those keys are strictly equal using the `!==` operator, which means
 * it performs a "strict equality" comparison.
 *
 * @param {Record<string, unknown>} obj1 - The first object to compare.
 * @param {Record<string, unknown>} obj2 - The second object to compare.
 *
 * @returns {boolean} - Returns `true` if both objects are equal, otherwise `false`.
 *
 * @example
 * const object1 = { a: 1, b: 2 };
 * const object2 = { a: 1, b: 2 };
 * const object3 = { a: 1, b: 3 };
 *
 * console.log(objectsEquality(object1, object2)); // true
 * console.log(objectsEquality(object1, object3)); // false
 */

export const objectsEquality = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj2[key] !== obj1[key]) {
      return false;
    }
  }

  return true;
};

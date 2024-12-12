export const CollectionUtility = {
  isEmpty: (value: unknown[]): boolean => {
    return value.length < 1
  },
  isNotEmpty: (value: unknown[]): boolean => {
    return !CollectionUtility.isEmpty(value)
  },
}

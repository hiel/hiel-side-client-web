export const ValidationUtility = {
  hasValue: (value: unknown): boolean => {
    return value !== undefined && value !== null
  },
  hasNotValue: (value: unknown): boolean => {
    return !ValidationUtility.hasValue(value)
  },
}

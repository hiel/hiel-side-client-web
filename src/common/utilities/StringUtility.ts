export const StringUtility = {
  isEmpty: (value: string | undefined | null): boolean => {
    return value === null || value === undefined || value.length < 1
  },
  isNotEmpty: (value: string | undefined | null): boolean => {
    return !StringUtility.isEmpty(value)
  },
  isBlank: (value: string | undefined | null): boolean => {
    return value === null || value === undefined || value.trim().length < 1
  },
  isNotBlank: (value: string | undefined | null): boolean => {
    return !StringUtility.isBlank(value)
  },
  isShort: (value: string | undefined | null, minLength: number): boolean => {
    return value === null || value === undefined || value.trim().length < minLength
  },
}

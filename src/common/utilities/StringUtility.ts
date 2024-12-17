export class StringUtility {
  static isEmpty(value: string | undefined | null): boolean {
    return value === null || value === undefined || value.length < 1
  }

  static isNotEmpty(value: string | undefined | null): boolean {
    return !StringUtility.isEmpty(value)
  }

  static isBlank(value: string | undefined | null): boolean {
    return value === null || value === undefined || value.trim().length < 1
  }

  static isNotBlank(value: string | undefined | null): boolean {
    return !StringUtility.isBlank(value)
  }

  static isShort(value: string | undefined | null, minLength: number): boolean {
    return value === null || value === undefined || value.trim().length < minLength
  }
}

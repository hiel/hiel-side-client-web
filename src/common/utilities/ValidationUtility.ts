export class ValidationUtility {
  static hasValue(value: unknown): boolean {
    return value !== undefined && value !== null
  }

  static hasNotValue(value: unknown): boolean {
    return !ValidationUtility.hasValue(value)
  }
}

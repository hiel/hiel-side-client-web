export class CollectionUtility {
  static orderAsc(a: number, b: number) {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    } else {
      return 0
    }
  }

  static orderDesc(a: number, b: number) {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  }

  static isEmpty(value: unknown[]): boolean {
    return value.length < 1
  }

  static isNotEmpty(value: unknown[]): boolean {
    return !CollectionUtility.isEmpty(value)
  }
}

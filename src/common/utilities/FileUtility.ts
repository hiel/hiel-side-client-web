const BINARY_UNIT_MULTIPLIER = 1024

export class FileUtility {
  static kiloByteToByte(kiloByte: number): number {
    return kiloByte * BINARY_UNIT_MULTIPLIER
  }

  static megaByteToByte(megaByte: number): number {
    return FileUtility.kiloByteToByte(megaByte * BINARY_UNIT_MULTIPLIER)
  }
}

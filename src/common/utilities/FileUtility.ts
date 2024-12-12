const BINARY_UNIT_MULTIPLIER = 1024

export const FileUtility = {
  kiloByteToByte: ({
    kiloByte,
  }: {
    kiloByte: number,
  }): number => {
    return kiloByte * BINARY_UNIT_MULTIPLIER
  },
  megaByteToByte: ({
    megaByte,
  }: {
    megaByte: number,
  }): number => {
    return FileUtility.kiloByteToByte({ kiloByte: megaByte }) * BINARY_UNIT_MULTIPLIER
  },
}

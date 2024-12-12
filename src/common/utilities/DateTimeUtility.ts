export const DateTimeUtility = {
  secondToMillisecond: ({
    second,
  }: {
    second: number,
  }): number => {
    return second * 1000
  },
}

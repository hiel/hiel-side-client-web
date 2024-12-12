import { Dayjs } from "dayjs"

export const DateTimeUtility = {
  secondToMillisecond: ({
    second,
  }: {
    second: number,
  }): number => {
    return second * 1000
  },
  initializeTime: ({
    datetime,
  }: {
    datetime: Dayjs,
  }): Dayjs => {
    return datetime.hour(0).minute(0).second(0).millisecond(0)
  },
}

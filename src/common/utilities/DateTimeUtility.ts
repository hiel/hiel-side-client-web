import { Dayjs } from "dayjs"

enum DATETIME_FORMAT {
  DATETIME = "YYYY-MM-DD HH:mm:ss",
  DATE = "YYYY-MM-DD",
}

export class DateTimeUtility {
  static toString({
    dayjs,
    format = DATETIME_FORMAT.DATETIME,
  }: {
    dayjs: Dayjs,
    format?: DATETIME_FORMAT,
  }): string {
    return dayjs.format(format)
  }

  static secondToMillisecond({
    second,
  }: {
    second: number,
  }): number {
    return second * 1000
  }
}

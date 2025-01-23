import dayjs, { Dayjs } from "dayjs"

export enum DATETIME_FORMAT {
  DATETIME = "YYYY-MM-DD HH:mm:ss",
  DATETIME_TIMEZONE = "YYYY-MM-DDTHH:mm:ssZ",
  DATE = "YYYY-MM-DD",
}

export class DateTimeUtility {
  static toDate(datetimeString: string): Dayjs {
    return dayjs(datetimeString)
  }

  static toString({ dayjs, format = DATETIME_FORMAT.DATETIME }: { dayjs: Dayjs, format?: DATETIME_FORMAT }): string {
    return dayjs.format(format)
  }

  static secondToMillisecond(second: number): number {
    return second * 1000
  }
}

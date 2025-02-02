import dayjs, { Dayjs } from "dayjs"
import { Range } from "@/common/domains/Range"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

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

  static isBetween({ date = dayjs(), range }: { date?: Dayjs, range: Range<Date> }): boolean {
    return date.isBetween(range.start, range.end)
  }
}

import dayjs from "dayjs"
import { Range } from "@/common/domains/Range"

export class TransactionUtility {
  static toTransactionMonthlyRangeStr(range: Range<Date>): string {
    return dayjs(range.start).format("YY.MM.DD") + " ~ " + dayjs(range.end).format("MM.DD")
  }
}

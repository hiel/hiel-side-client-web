import { ApiResultCode } from "@/common/apis/ApiResultCode"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"

export class ApiResponse<D = null> {
  public resultCode: string
  public message?: string
  public data?: D

  constructor({
    resultCode,
    message,
    data,
  }: {
    resultCode: string,
    message?: string,
    data?: D,
  }) {
    this.resultCode = resultCode
    this.message = message
    this.data = data
  }

  isSuccess(): boolean {
    return this.resultCode === ApiResultCode.SUCCESS
  }

  isSuccessAndHasData(): boolean {
    return this.isSuccess() && ValidationUtility.hasValue(this.data)
  }
}

export interface SliceResponseData<E> {
  content: E[],
  pageSize: number,
  hasNext: boolean,
}

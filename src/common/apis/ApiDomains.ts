import { ApiResultCode } from "@/common/apis/ApiResultCode"

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
}

export class ApiSliceResponse<E> extends ApiResponse<{ pageSize: number, list: E[] }> {
  constructor({
    resultCode,
    message,
    data,
  }: {
    resultCode: string,
    message?: string,
    data: { pageSize: number, list: E[] },
  }) {
    super({ resultCode, message, data })
  }
}

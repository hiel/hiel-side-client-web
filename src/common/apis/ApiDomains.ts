import { ApiResultCode } from "@/common/apis/ApiResultCode"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"
import { CollectionUtility } from "@/common/utilities/CollectionUtility"

export class ApiResponse<D = null> {
  public resultCode: string
  public message?: string
  public data?: D

  constructor({ resultCode, message, data }: { resultCode: string, message?: string, data?: D }) {
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

export function hasContent<E>(slice: SliceResponseData<E>): boolean {
  return CollectionUtility.isNotEmpty(slice.content)
}

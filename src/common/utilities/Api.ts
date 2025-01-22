import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ApiResponse } from "@/common/apis/ApiDomains"
import { DATETIME_FORMAT, DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import _ from "lodash"
import dayjs from "dayjs"

type RequestDataType = number | string | boolean | null | Date
type RequestDataRecordType = Record<string, RequestDataType>

function convertData(data: RequestDataType): string {
  return (data instanceof Date) ?
    DateTimeUtility.toString({ dayjs: dayjs(data), format: DATETIME_FORMAT.DATETIME_TIMEZONE }) : String(data)
}

export class Api {
  readonly axiosInstance: AxiosInstance

  constructor({ url, timeoutSecond }: { url: string, timeoutSecond: number }) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: DateTimeUtility.secondToMillisecond(timeoutSecond),
    })
  }

  async get<T>({ url, queryParams = {} }: { url: string, queryParams?: RequestDataRecordType }): Promise<ApiResponse<T>> {
    return await this.request<T>({
      method: "GET",
      url: url,
      queryParams: queryParams,
    })
  }

  async post<T>(
    {
      url,
      queryParams = {},
      requestBody = {},
      files = undefined,
    }: {
      url: string,
      queryParams?: RequestDataRecordType,
      requestBody?: RequestDataRecordType,
      files?: Record<string, File>,
    }): Promise<ApiResponse<T>> {
    return await this.request<T>({
      method: "POST",
      url: url,
      queryParams: queryParams,
      requestBody: requestBody,
      files: files,
    })
  }

  async put<T>(
    {
      url,
      queryParams = {},
      requestBody = {},
      files = undefined,
    }: {
      url: string,
      queryParams?: RequestDataRecordType,
      requestBody?: RequestDataRecordType,
      files?: Record<string, File>,
    }): Promise<ApiResponse<T>> {
    return await this.request<T>({
      method: "PUT",
      url: url,
      queryParams: queryParams,
      requestBody: requestBody,
      files: files,
    })
  }

  async delete<T>(
    {
      url,
      queryParams = {},
      requestBody = {},
    }: {
      url: string,
      queryParams?: RequestDataRecordType,
      requestBody?: RequestDataRecordType,
    }): Promise<ApiResponse<T>> {
    return await this.request<T>({
      method: "DELETE",
      url: url,
      queryParams: queryParams,
      requestBody: requestBody,
    })
  }

  private async request<T>(
    {
      method,
      url,
      queryParams = undefined,
      requestBody = undefined,
      files = undefined,
    }: {
      method: "GET" | "POST" | "PUT" | "DELETE",
      url: string,
      queryParams?: RequestDataRecordType,
      requestBody?: RequestDataRecordType,
      files?: Record<string, File>,
    }): Promise<ApiResponse<T>> {
    if (requestBody && files) {
      Object.keys(requestBody).forEach(key => {
        if (Object.keys(files).includes(key)) {
          throw new Error("Duplicated key")
        }
      })
    }
    if (queryParams) {
      queryParams = _.reduce(queryParams, (result, value, key) => {
        result[key] = convertData(value)
        return result
      }, {} as RequestDataRecordType)
    }

    let formData: FormData | undefined
    if (requestBody || files) {
      formData = new FormData()
    }
    if (requestBody) {
      Object.entries(requestBody).forEach(([key, value]) => {
        formData!.append(key, convertData(value))
      })
    }
    if (files) {
      Object.entries(files).forEach(([key, value]) => {
        formData!.append(key, value)
      })
    }

    const axiosResponse: AxiosResponse<ApiResponse<T>> = await this.axiosInstance({
      method: method,
      url: url,
      params: queryParams,
      data: formData,
      headers: { "Content-Type": files ? "multipart/form-data" : "application/json; charset=utf-8" },
    })

    return new ApiResponse<T>({
      resultCode: axiosResponse.data.resultCode,
      message: axiosResponse.data.message,
      data: axiosResponse.data.data,
    })
  }
}

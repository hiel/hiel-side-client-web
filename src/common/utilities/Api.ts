import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ApiResponse, ApiSliceResponse } from "@/common/apis/ApiDomains"
import { DateTimeUtility } from "@/common/utilities/DateTimeUtility"

export class Api {
  readonly axiosInstance: AxiosInstance

  constructor(
    {
      url,
      timeoutSecond,
    }: {
      url: string,
      timeoutSecond: number,
    }) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: DateTimeUtility.secondToMillisecond({ second: timeoutSecond }),
    })
  }

  async get<T>(
    {
      url,
      queryParams = {},
    }: {
      url: string,
      queryParams?: Record<string, number | string>,
    }): Promise<ApiResponse<T>> {
    return await this.request<T>({
      method: "GET",
      url: url,
      queryParams: queryParams,
    })
  }

  async getSlice<T>(
    {
      url,
      queryParams = {},
    }: {
      url: string,
      queryParams?: Record<string, number | string>,
    }): Promise<ApiSliceResponse<T>> {
    const response = await this.request<T>({
      method: "GET",
      url: url,
      queryParams: queryParams,
    })
    return new ApiSliceResponse({
      resultCode: response.resultCode,
      message: response.message,
      data: response.data as { pageSize: number; list: T[] },
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
      queryParams?: Record<string, number | string>,
      requestBody?: Record<string, number | string>,
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
      queryParams?: Record<string, number | string>,
      requestBody?: Record<string, number | string>,
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
      queryParams?: Record<string, number | string>,
      requestBody?: Record<string, number | string>,
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
      method: string,
      url: string,
      queryParams?: Record<string, number | string>,
      requestBody?: Record<string, number | string>,
      files?: Record<string, File>,
    }): Promise<ApiResponse<T>> {
    let formData: FormData | undefined
    if (requestBody || files) {
      formData = new FormData()
    }
    if (requestBody) {
      Object.entries(requestBody).forEach(([key, value]) => {
        formData!.append(key, value.toString())
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
      headers: {
        "Content-Type": files ? "multipart/form-data" : "application/json; charset=utf-8",
      },
    })
    return new ApiResponse<T>({
      resultCode: axiosResponse.data.resultCode,
      message: axiosResponse.data.message,
      data: axiosResponse.data.data,
    })
  }
}

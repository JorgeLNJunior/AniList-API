import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

@Injectable()
export class HttpService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create()
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.axios.get(url, config)
  }
}

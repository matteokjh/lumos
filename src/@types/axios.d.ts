import axios from 'axios'

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {
    code: number
    msg: string,
    data: any
  }
}

declare global {
  interface Window {
    timer: NodeJS.Timeout | null
  }
}
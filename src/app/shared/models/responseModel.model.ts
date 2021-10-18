export interface ResponseModel<T>  {
  messages: string
  result: T
  resultCode: number
  resultCodeDescription: string;
}

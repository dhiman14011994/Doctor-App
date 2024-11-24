export interface BaseModel<T> {
  success?: boolean;
  responseMessage?: string;
  data?: T;
  totalRecord?: string;
}

export interface IHttpResult<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

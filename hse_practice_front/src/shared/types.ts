export type ResponseGeneric<T> = {
  success: boolean;
  error?: object;
  data: T;
};

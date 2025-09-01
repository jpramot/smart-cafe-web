export type ApiResponse<T, U> = ResponseSuccess<T> | ResponseFail<U>;

type ResponseSuccess<T> = {
  success: true;
  message: string;
  data?: T;
};

type ResponseFail<T> = {
  success: false;
  message: string;
  errors?: T;
};

export interface ApiError {
  error: {
    status: string;
    message: string;
  };
}

export interface ApiErrorMessage {
  message: string;
}

export interface ResponseDto {
    status?: boolean;
    data?: any;
    message?: string;
    error?: any;
    details?: string;
    statusCode?: number;
    errorMessage?: any;
    errorDetails?: any;
  }

export interface FunctionalResponseDto {
    api_status?: number;
    message?: string;
    data?: any;
    error?: [
      {
        error_code?: number;
        error_msg?: string;
      },
    ];
    detail?: any;
    errorMessage?: any;
  }
import { ResponseDto, FunctionalResponseDto } from "./responseServices.dto";

export const setSuccessResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const successResponse: ResponseDto = {
    status: true,
    statusCode: response.statusCode || 200,
  };

  if (response.message) {
    successResponse["message"] = response.message;
  }
  if (response.data) {
    successResponse["data"] = response.data;
  }

  return successResponse;
};

export const setErrorResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const errorResponse: ResponseDto = {
    status: false,
    statusCode: response.statusCode,
    message: response.message || getResponseMessage("SOMETHING_WRONG"),
  };

  if (response.data) {
    errorResponse["data"] = response.data;
  }

  if (response.error) {
    errorResponse["error"] = response.error.message || response.error;
  }

  return errorResponse;
};

export const sendResponse = (responseData: ResponseDto) => {
  let response: FunctionalResponseDto;
  if (responseData.status) {
    response = {
      api_status: responseData.statusCode,
      message: responseData.message,
    };
    if (responseData.data) {
      response = {
        api_status: responseData.statusCode || 200,
        message: responseData.message,
        data: responseData.data,
      };
    }
  } else {
    response = {
      api_status: responseData.statusCode || 500,
      error: responseData.error,
      message: responseData.message,
    };
    if (responseData.data) {
      response.data = responseData.data;
    }
    if (responseData.details) {
      response.detail = responseData.details;
    }
  }
  return response;
};

export const getResponseMessage = (message: string) => {
  const messageConstant: any = {
    SOMETHING_WRONG: "Something went wrong, Please try again",
    VALIDATION_ERROR: "Validation error occurred, some required data is missing",
    VALIDATION_SUCCESS: "Validated successfully",
    EMAIL_ALREADY_EXIST: "Email ID Already Exist",
    REGISTRATION_SUCCESS: "User Registration Success",
    REGISTRATION_FAILED: "User Registration Failed",
    USER_NOT_REGISTERED: "User Not Registered",
    INVALID_EMAIL_OR_PASSWORD: "Please Provide Email and Password",
    INVALID_PASSWORD: "Invalid Password",
    LOGIN_SUCCESS: "Login Success",
    USERS_FOUND: "Users found in database",
    USERS_NOT_FOUND: "Users not found",
    APPOINTMENT_OVERLAPPED:"Someone has already booked appointment in this time",
    APPOINTMENT_CREATION_ERROR:"Error ocuured during appointment creation",
    REQUIRED_TOKEN:"Token is Required",
    REQUIRED_VALID_TOKEN:"Valid token is required"

  };

  return messageConstant[message] || null;
};

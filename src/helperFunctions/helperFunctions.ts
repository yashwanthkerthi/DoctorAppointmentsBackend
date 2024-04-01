import jwt from "jsonwebtoken";
import { ResponseDto } from "@dtos/reusableDtos";
import {
  setErrorResponse,
  getResponseMessage,
} from "@services/responseServices";

export const generateAccessToken = async (userDetails: any) => {
  const { first_name, last_name, email } = userDetails;
  const payload = {
    first_name,
    last_name,
    email,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const tokenExpiryTime = process.env.JWT_EXPIRY;
  try {
    const jwtToken = jwt.sign(payload, secretKey, {
      expiresIn: tokenExpiryTime,
    });
    return jwtToken;
  } catch (error) {
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};

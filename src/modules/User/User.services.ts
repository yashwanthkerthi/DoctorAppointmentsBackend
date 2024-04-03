import { sequelize } from "@loaders/database";
import { UsersModel } from "./User.model";
import bcrypt from "bcryptjs";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import {
  UserLoginDetailsDTO,
  UserSignupDetailsDTO,
  ResponseDto,
  UserJwtDetailsDTO,
} from "./User.dto";
import { generateAccessToken } from "@utils/helperFunctions";

export const SignUp = async (
  userSignupDetails: UserSignupDetailsDTO
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { firstName, lastName, email, password } = userSignupDetails;
    const isUserPresentInDb = await UsersModel.findOne({
      where: { email },
    });

    if (isUserPresentInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("EMAIL_ALREADY_EXIST"),
      }));
    }

    const saltRounds: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const jwtToken = await generateAccessToken(userSignupDetails);

    const createCandidateInDb: any = await UsersModel.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    });
    if (!createCandidateInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("REGISTRATION_FAILED"),
      }));
    }

    const data = {
      email,
      first_name: firstName,
      last_name: lastName,
      jwtToken,
    };

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("REGISTRATION_SUCCESS"),
      data,
    }));
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

export const Signin = async (
  userLoginDetails: UserLoginDetailsDTO
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { email, password } = userLoginDetails;

    const foundUserDetails: any = await UsersModel.findOne({
      where: { email },
    });

    if (foundUserDetails.length === 0) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("USER_NOT_REGISTERED"),
      }));
    }

    const passwordMatched: boolean = await bcrypt.compare(
      password,
      foundUserDetails.password
    );

    if (!passwordMatched) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("INVALID_PASSWORD"),
      }));
    }

    const userDetails: UserJwtDetailsDTO = {
      email: foundUserDetails.email,
      first_name:foundUserDetails.first_name
    };
    const jwtToken = await generateAccessToken(userDetails);

    const data = {
      ...userDetails,
      jwtToken,
    };

    response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("LOGIN_SUCCESS"),
      data,
    });
    return response;
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

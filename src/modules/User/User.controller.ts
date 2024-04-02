import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import jwt from "jsonwebtoken";
import * as userServices from "./User.services";
import { UserLoginDetailsDTO, UserSignupDetailsDTO } from "./User.dto";
import { schemaValidation } from "@utils/helperFunctions";


export const SignUp = async (req: Request, res: Response): Promise<any> => {
  try {
    let response: ResponseDto;
    const userDetails: UserSignupDetailsDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });
    const validateResult: ResponseDto = await schemaValidation(userDetails, schema);
    // console.log("validate",validateResult);
    
    if (!validateResult.status) {
      response = sendResponse(validateResult);
      return res.json(response);
    } else {
      response = await userServices.SignUp(userDetails);
      response = sendResponse(response);
      return res.json(response);
    }
  } catch (error) {
    let result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    result = sendResponse(result);
    return res.json(result);
  }
};

export const Signin = async (req: Request, res: Response): Promise<any> => {
  try {
    let response: ResponseDto;
    const userLoginDetails: UserLoginDetailsDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
    const validateResult: ResponseDto = await schemaValidation(userLoginDetails, schema);
    if (!validateResult.status) {
      response = sendResponse(validateResult);
      return res.json(response);
    } else {
      response = await userServices.Signin(userLoginDetails);
      response = sendResponse(response);
      return res.json(response);
    }
  } catch (error) {
    let result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    result = sendResponse(result);
    return res.json(result);
  }
};

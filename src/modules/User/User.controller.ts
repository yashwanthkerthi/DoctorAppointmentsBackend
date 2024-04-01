import { ResponseDto } from "@dtos/reusableDtos";
// import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import jwt from "jsonwebtoken";
import * as userServices from "./User.services";
import {
  userLoginDetailsDTO,
  userSignupDetailsDTO,
} from "./User.dto";

export const SignUp = async (req: Request, res: Response): Promise<any> => {
  try {
    let response: ResponseDto;
    const userDetails: userSignupDetailsDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
      });
    const validateResult: ResponseDto =  schema.validate(userDetails);
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
    const userLoginDetails: userLoginDetailsDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
      });
    const validateResult: ResponseDto =  schema.validate(userLoginDetails);
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



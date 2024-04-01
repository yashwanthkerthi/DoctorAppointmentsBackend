import { UserJwtDetailsDTO } from "../../src/modules/User/User.dto";
import { Request as ExpressRequest } from "express";
import { JwtPayload } from "jsonwebtoken";



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


  export interface Request extends ExpressRequest {
    user?: string | JwtPayload | UserJwtDetailsDTO;
  }
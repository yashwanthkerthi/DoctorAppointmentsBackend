import { AppointmentModel } from "./Appointment.model";
import { AppointmentFormDetailsDTO } from "./Appointment.dto";
import { ResponseDto } from "../../dtos/reusableDtos";
// import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
  sendResponse,
} from "@services/responseServices";
import * as AppointmentServices from "./Appointment.services";
import { schemaValidation } from "@utils/helperFunctions";


export const appointmentFormSubmission = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const appointmentFormDetails: AppointmentFormDetailsDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        address: Joi.string().required(),
        date: Joi.string().required(),
        time:Joi.string().required()
      });
    const validateResult: ResponseDto = await schemaValidation(appointmentFormDetails, schema);;
    if (!validateResult.status) {
      response = sendResponse(validateResult);
      return res.json(response);
    } else {
      response = await AppointmentServices.SubmitAppointment(
        appointmentFormDetails
      );
      response = sendResponse(response);
      return res.json(response);
    }
  } catch (error) {
    console.log(error); 
  }
};

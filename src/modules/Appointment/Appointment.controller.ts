import { AppointmentModel } from "./Appointment.model";
import { AppointmentFormDetailsDTO } from "./Appointment.dto";
import { ResponseDto } from "../../dtos/reusableDtos";
// import { Request } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response } from "express";
import { setErrorResponse, getResponseMessage, setSuccessResponse,sendResponse } from "@services/responseServices";
import * as AppointmentServices from "./Appointment.services"

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
          firstName: Joi.string().required().label("Firstname"),
          lastName: Joi.string().required().label("lastName"),
          phoneNumber: Joi.string().required().label("phoneNumber"),
          email: Joi.string().required().label("Email"),
          address: Joi.string().required().label("address"),
          date: Joi.string().required().label("Date"),
        });
      const validateResult: ResponseDto = await schema.validate(
        appointmentFormDetails,
      );
      if (!validateResult.status) {
        response = sendResponse(validateResult);
        return res.json(response);
      } else {
        response = await AppointmentServices.SubmitAppointment(appointmentFormDetails);
        response = sendResponse(response);
        return res.json(response);
      }
    } catch (error) {}
  };
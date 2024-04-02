import { AppointmentFormDetailsDTO } from "./Appointment.dto";
import { ResponseDto } from "../../dtos/reusableDtos";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { AppointmentModel } from "./Appointment.model";
import { Op } from "sequelize";
import moment from "moment";

export const SubmitAppointment = async (
  appointmentFormDetails: AppointmentFormDetailsDTO
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { firstName, lastName, phoneNumber, email, address, date, time } =
      appointmentFormDetails;

    console.log(appointmentFormDetails);

    const startTime = new Date(date + "T" + time);
    const endTime = new Date(new Date(startTime).setMinutes(30));
    const overlappingAppointments: any = await AppointmentModel.findAll({
      where: {
        [Op.or]: [
          { start_time: { [Op.between]: [startTime, endTime] } },
          { end_time: { [Op.between]: [startTime, endTime] } },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("APPOINTMENT_OVERLAPPED"),
      });
    } else if(overlappingAppointments.length === 0) {
       await AppointmentModel.create({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        address,
        date: new Date(date),
        start_time: startTime,
        end_time: endTime,
      });
      
    response = setSuccessResponse({
        statusCode: 200,
        message: getResponseMessage("APPOINTMENT_CREATED"),
      });
    }
    return response;

  } catch (error) {
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("APPOINTMENT_CREATION_ERROR"),
      error,
      details: error,
    });
    return result;
  }
};

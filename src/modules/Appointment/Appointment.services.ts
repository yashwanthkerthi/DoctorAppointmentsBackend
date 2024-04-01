import { AppointmentFormDetailsDTO } from "./Appointment.dto";
import { ResponseDto } from "../../dtos/reusableDtos";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { AppointmentModel } from "./Appointment.model";
import { Op } from "sequelize";

export const SubmitAppointment = async (
  appointmentFormDetails: AppointmentFormDetailsDTO
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const {
      first_name,
      last_name,
      phone_number,
      email,
      address,
      date,
      start_time,
    } = appointmentFormDetails;
    const startTime = new Date(date + "T" + start_time);
    const endTime = new Date(startTime.getTime() + 30);
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
        // data,
      });
    }

    const newAppointment = await AppointmentModel.create({
      first_name,
      last_name,
      phone_number,
      email,
      address,
      date,
      start_time: startTime,
      end_time: endTime,
    });

    response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage(""),
      data: newAppointment,
    });
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

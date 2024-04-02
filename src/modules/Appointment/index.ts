import { Router } from "express";
import * as AppointmentControllers from "./Appointment.controller" ;
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post("/appointment",authentication, AppointmentControllers.appointmentFormSubmission);

export default router;

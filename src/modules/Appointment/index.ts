import { Router } from "express";
import * as AppointmentControllers from "./Appointment.controller" ;
const router = Router();

router.post("/appointment", AppointmentControllers.appointmentFormSubmission);

export default router;

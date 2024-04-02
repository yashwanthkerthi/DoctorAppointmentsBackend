import { authentication } from "../middlewares/middlewares";
import User from "@modules/User/index";
import Appointment from "@modules/Appointment/index";

export const routes = (app: any) => {
  app.use(`/api`, Appointment);
  app.use(`/api`, User);
};

export interface AppointmentFormDetailsDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  address: string;
  date: Date;
  start_time: Date;
}

export interface AppointmentDTO {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  address: string;
  date: Date;
  start_time: Date;
  end_time: Date;
}

export interface AppointmentCreationDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: number;
  address: string;
  date: Date;
  start_time: Date;
  end_time: Date;
}

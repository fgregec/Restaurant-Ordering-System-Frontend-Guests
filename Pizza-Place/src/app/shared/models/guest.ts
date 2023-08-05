export interface RegisterGuest{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  
  export interface LoginGuest{
    email: string;
    password: string;
  }
  
  export interface Guest{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
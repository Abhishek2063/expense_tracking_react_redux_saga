// Registration
export const REGISTRATION = "REGISTRATION";
export const registration = (data) => ({ type: REGISTRATION, data });
export const SUCCESS_REGISTRATION = "SUCCESS_REGISTRATION";
export const ERROR_REGISTRATION = "ERROR_REGISTRATION";
export const registrationResponse = (type, data) => ({ type, data });

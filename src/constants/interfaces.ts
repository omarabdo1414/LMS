//>>>>>forms
//signup form
export interface ISignupForm {
  fName: string;
  lName: string;
  email: string;
  password: string;
  cpassword: string;
  phoneNumber: string;
  classLevel: string;
}
//signup api
export interface ISignup {
  fullName: string;
  email: string;
  password: string;
  cpassword: string;
  phoneNumber: string;
  classLevel: string;
}
//login api
export interface ILoginForm {
  email: string;
  password: string;
}
//forgetpassword api
export interface IForgetPass {
  email: string;
}
// reset password
export interface IResetPass {
  email: string;
  newPassword: string;
  cpassword: string;
  otp: string;
}
//profile
export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  isVerified: string;
  createdAt: Date;
  updatedAt: Date;
}
//user state
export interface IUserState {
  userData: IUser | null;
}
// lesson
export interface Ilesson {
  _id: string;
  title: string;
  description: string;
  video: string;
  classLevel: string;
  price: number;
  isPaid: boolean;
  scheduledDate: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

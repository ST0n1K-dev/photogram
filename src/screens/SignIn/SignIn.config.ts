/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

export interface SingInInterface {
    handleLogin: (values: SignInValues) => void;
}

export const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

export interface SignInValues {
    email: string;
    password: string;
}

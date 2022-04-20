/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

export interface SingInInterface {
    handleLogin: (values: SignInValues) => void;
}

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/[a-zA-Z]/, 'Username latin letters only.')
      .required('Required'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });

export interface SignInValues {
    username: string;
    password: string;
}

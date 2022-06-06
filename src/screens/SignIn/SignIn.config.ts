/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

export interface SingInInterface {
    handleLogin: (values: SignInValues) => void;
}

export const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Недопустиме значення')
      .required('Email є обов\'язковим'),
    password: Yup.string()
        .required('Пароль є обов\'язковим')
        .min(8, 'Пароль має містити не менше 8 символів')
  });

export interface SignInValues {
    email: string;
    password: string;
}

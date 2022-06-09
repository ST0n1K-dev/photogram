/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

export interface SingUpInterface {
	handleSignUp: (values: SignUpValues) => void;
	pickPassport: (image: File) => void,
	isLoading?: boolean
}

export const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(2, 'Занадто коротке ім\'я користувача')
		.max(50, 'Занадто довге ім\'я користувача')
		.matches(/[a-zA-Z]/, 'Лише латинські літери')
		.required('Це поле є обов\'язковим'),
	password: Yup.string()
		.required('Це поле є обов\'язковим')
		.min(8, 'Пароль має містити не менше 8 символів'),
	fullName: Yup.string()
		.min(2, 'Занадто коротке повне ім\'я')
		.max(80, 'Занадто довге повне ім\'я')
		.required('Це поле є обов\'язковим'),
	email: Yup.string()
		.email('Недопустиме значення')
		.required('Це поле є обов\'язковим'),
});

export interface SignUpValues {
	username: string;
	password: string;
  	fullName: string;
	email: string;
}

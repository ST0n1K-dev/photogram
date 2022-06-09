import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Backdrop, CircularProgress } from '@mui/material';
import InputField from 'Component/InputField';
import * as ROUTES from 'Type/routes';
import { SignupSchema, SignUpValues, SingUpInterface } from './SignUp.config';
import './SignUp.style.scss';

const SignUpForm: React.FC<SingUpInterface> = ({ handleSignUp, pickPassport }) => {
    const initialValues: SignUpValues = {
        username: '',
		fullName: '',
		password: '',
		email: ''
    };

    return (
		<Formik
			initialValues={initialValues}
			validationSchema={SignupSchema}
			onSubmit={(values) => {
                handleSignUp(values);
			}}
		>
			{({
                errors, touched, values, handleBlur, handleChange
            }) => (
				<Form>
					<InputField
                        id="email"
                        name="email"
                        placeholder="Пошта"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={(errors.email && touched.email) ? errors.email : null}
					/>
                    <InputField
                        id="username"
                        name="username"
                        placeholder="Ім'я користувача"
                        value={values.username}
                        onChange={handleChange('username')}
                        onBlur={handleBlur('username')}
                        error={(errors.username && touched.username) ? errors.username : null}
                    />
					<InputField
                        id="fullName"
                        name="fullName"
                        placeholder="Повне ім'я"
                        value={values.fullName}
                        onChange={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        error={(errors.fullName && touched.fullName) ? errors.fullName : null}
					/>
					<InputField
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={(errors.password && touched.password) ? errors.password : null}
					/>
					<div>
						<p>Завантажте фотографію паспорта</p>
						<input required onChange={(e) => pickPassport(e!.currentTarget!.files![0])} name="myFile" type="file" />
					</div>
					<Button type="submit" variant="contained">Зареєструватись</Button>
				</Form>
			)}
		</Formik>
	);
};

export const SignIn: React.FC<SingUpInterface> = (props) => {
	const { handleSignUp, pickPassport, isLoading } = props;
	return (
		<div className="SignUp">
			<div className="SignUp__InformationalBlock">
				<img
					className="SignUp__InformationalBlock--picture"
					src="/images/social-media.png"
					alt="Social media"
				/>
			</div>
			<div className="SignUp__LoginFormWrapper">
				<h2 className="SignUp__LoginFormWrapper--title">
					Створіть новий акаунт
				</h2>
				<div className="SignUp__LoginForm">
					<SignUpForm handleSignUp={handleSignUp} pickPassport={pickPassport} />
				</div>
				<div className="SignUp__CreateAccount">
					<p>Вже маєте акаунт?</p>
					<Link to={ROUTES.SIGNIN}>Увійти</Link>
				</div>
			</div>
			<Backdrop
				sx={{ color: '#fff', zIndex: 10 }}
				open={isLoading!}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default SignIn;

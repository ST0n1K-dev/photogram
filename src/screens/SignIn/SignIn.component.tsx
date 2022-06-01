import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button } from '@mui/material';
import InputField from 'Component/InputField';
import * as ROUTES from 'Type/routes';
import { SignupSchema, SignInValues, SingInInterface } from './SignIn.config';
import './SignIn.style.scss';

const SignInForm: React.FC<SingInInterface> = ({ handleLogin }) => {
    const initialValues: SignInValues = {
        email: '',
		password: '',
    };

    return (
		<Formik
			initialValues={initialValues}
			validationSchema={SignupSchema}
			onSubmit={(values) => {
                handleLogin(values);
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
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={(errors.password && touched.password) ? errors.password : null}
					/>
					<Button type="submit" variant="contained">Увійти</Button>
				</Form>
			)}
		</Formik>
	);
};

export const SignIn: React.FC<SingInInterface> = (props) => {
	const { handleLogin } = props;
	return (
		<div className="SignIn">
			<div className="SignIn__InformationalBlock">
				<img
					className="SignIn__InformationalBlock--picture"
					src="/images/social-media.png"
					alt="Social media"
				/>
			</div>
			<div className="SignIn__LoginFormWrapper">
				<h2 className="SignIn__LoginFormWrapper--title">
					Увійдіть до вашого акаунту
				</h2>
				<div className="SignIn__LoginForm">
					<SignInForm handleLogin={handleLogin} />
				</div>
				<div className="SignIn__CreateAccount">
					<p>Ще не маєте акаунта?</p>
					<Link to={ROUTES.SIGNUP}>Зареєструватися</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

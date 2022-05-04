/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Formik, Form } from 'formik';
import InputField from 'Component/InputField';

import {
  Modal, Box, Typography, Button
} from '@mui/material';

import { SettingsModalComponentInterface, ProfileSettingsSchema } from './SettingsModal.config';
import './SettingsModal.style.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const SettingsModalComponent: React.FC<SettingsModalComponentInterface> = (
	props
) => {
	const {
    isShowing,
    onClose,
    handleUpdateProfile,
    fullName,
	avatar,
    description
  } = props;

  const getImageFromFile = (file: any): string => {
	  if (typeof file === 'object') {
		const url = URL.createObjectURL(file);

		return url;
	  }

	  return file;
  };

	return (
		<div>
			<Modal
				open={isShowing}
				onClose={onClose}
				aria-labelledby="user-settings"
			>
				<Box className="SettingsModal" sx={style}>
					<Typography id="title" variant="h6" component="h2">
						Settings
					</Typography>
					<Formik
						initialValues={{ fullName, description, avatar }}
						validationSchema={ProfileSettingsSchema}
						onSubmit={(values) => {
							handleUpdateProfile(values);
						}}
					>
						{({
							errors,
							touched,
							values,
							handleBlur,
							handleChange,
							setFieldValue,
						}) => (
							<Form>
								<div className="image-input">
									<label htmlFor="avatar">
										<input
											id="avatar"
											name="avatar"
											type="file"
											onChange={(event) => {
												setFieldValue(
													'avatar',
													event!.currentTarget!.files![0]
												);
											}}
										/>
										<figure className="personal-figure">
											<img
												src={values.avatar ? getImageFromFile(values.avatar) : '/images/avatar.png'}
												className="personal-avatar"
												alt="avatar"
											/>
											<figcaption className="personal-figcaption">
												<img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" alt="hover" />
											</figcaption>
										</figure>
									</label>
								</div>
								<InputField
									id="fullName"
									name="fullName"
									placeholder="Full name"
									value={values.fullName}
									onChange={handleChange('fullName')}
									onBlur={handleBlur('fullName')}
									error={
										errors.fullName && touched.fullName
											? errors.fullName
											: null
									}
								/>
								<InputField
									id="description"
									type="textarea"
									name="description"
									placeholder="Description"
									value={values.description || ''}
									onChange={handleChange('description')}
									onBlur={handleBlur('description')}
									error={
										errors.description
										&& touched.description
											? errors.description
											: null
									}
								/>
								<Button type="submit" variant="contained">
									Save
								</Button>
							</Form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	);
};

export default SettingsModalComponent;

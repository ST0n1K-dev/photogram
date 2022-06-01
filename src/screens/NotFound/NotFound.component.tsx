import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import * as ROUTES from 'Type/routes';
import './NotFound.style.scss';

const NotFound = () => (
	<div className="NotFound">
		<div className="NotFound__gif">
			<img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
		</div>
		<div className="NotFound__content">
			<h1 className="NotFound__content--heading">Ця сторінка не існує.</h1>
			<p>
				...схоже що ти шукав те чого ще не існуж на цьому сайті.
			</p>
			<Link to={ROUTES.HOME}>
				<Button>Повернутись на головну</Button>
			</Link>
		</div>
	</div>
);

export default NotFound;

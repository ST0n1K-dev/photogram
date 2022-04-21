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
			<h1 className="NotFound__content--heading">This page is gone.</h1>
			<p>
				...maybe the page you&apos;re looking for is not found or never
				existed.
			</p>
			<a href="https://www.google.co.in/" target="blank">
                <Link to={ROUTES.HOME}>
                    <Button>
                        Go back home
                    </Button>
                </Link>
			</a>
		</div>
	</div>
);

export default NotFound;

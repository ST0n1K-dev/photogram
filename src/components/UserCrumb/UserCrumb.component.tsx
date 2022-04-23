import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton } from '@mui/material';
import { AccountCircle, Pages } from '@mui/icons-material';

import { UserCrumbComponentInterface } from './UserCrumb.config';

import './UserCrumb.style.scss';

const UserCrumbComponent: React.FC<UserCrumbComponentInterface> = (props) => {
	const { username, fullName, accountActivityInfo } = props;
  const { followers, following } = accountActivityInfo;

  if (!username || !fullName) {
    return <Skeleton variant="text" animation="wave" height={60} />;
  }

	return (
    <Link className="UserCrumb--link" to={`/profile/${username}`}>
      <div className="UserCrumb">
        <Avatar alt="Remy Sharp" src="/images/avatar.png" />
        <div className="UserCrumb__InfoWrapper">
          <div className="UserCrumb__Info">
            <h5 className="UserCrumb__Info--title">{fullName}</h5>
            <span className="UserCrumb__Info--username">@{username}</span>
          </div>
          <div className="UserCrumb__PromotionInfo">
            <div className="UserCrumb__PromotionInfo--accountability">
              <Pages />
              <span>{followers}</span>
            </div>
            <div className="UserCrumb__PromotionInfo--accountability">
              <AccountCircle />
              <span>{following}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCrumbComponent;

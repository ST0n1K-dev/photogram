import React from 'react';
import UserCrumb from 'Component/UserCrumb';
import SuggestedUsers from 'Component/SuggestedUsers';
import { useUser } from 'Hook/useUser';
import { HomeProps } from './Home.config';
import './Home.style.scss';

export const HomeScreen: React.FC<HomeProps> = (props) => {
    const {
		user: {
            fullName,
            username,
            userId,
            following
        },
		accountActivityInfo,
	} = props;

    const { user } = useUser();

    if (!Object.keys(user).length) {
       return <h3>No user</h3>;
    }

    return (
        <div className="HomePage">
            <div className="HomePage__Posts">
                <h2>Home page of {fullName}</h2>
            </div>
            <div className="HomePage__Sidebar">
                <div className="HomePage__Sidebar--User">
                    <UserCrumb
                        username={username}
                        fullName={fullName}
                        accountActivityInfo={accountActivityInfo}
                    />
                </div>
                <div className="HomePage__Sidebar--Suggestions">
                    <SuggestedUsers userId={userId} following={following} />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Modal,
    Typography,
    Avatar,
    Button
} from '@mui/material';
import { User } from 'Type/User';
import { getUsersById } from 'Util/firebase';

import { FollowersModalInterface, UserProfileInterface } from './Profile.config';

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

const FollowingUserProfile = (props: UserProfileInterface) => {
    const { fullName, username } = props;
    return (
        <div className="FollowingUser">
            <Avatar alt="Remy Sharp" src="/images/avatar.png" />
            <div className="FollowingUser__InfoWrapper">
                <div className="FollowingUser__Info">
                    <h5 className="FollowingUser__Info--title">
                        {fullName}
                    </h5>
                    <span className="FollowingUser__Info--username">
                        {username}
                    </span>
                </div>
                <div className="FollowingUser__Action">
                    <Button variant="text">Follow</Button>
                </div>
            </div>
        </div>
    );
};

const FollowersModal = ({
    isOpen, onClose, followers, type
}: FollowersModalInterface) => {
    const [profiles, setProfiles] = useState<Array<User>>([]);

	useEffect(() => {
		async function getSuggestedUsers() {
			const userProfiles = await getUsersById(followers);
			setProfiles(userProfiles as Array<User>);
		}

		if (followers?.length > 0) {
			getSuggestedUsers();
		}
	}, [followers]);

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
            >
            <Box className="FollowersModal" sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    { type === 'followers' ? 'Current followers' : 'Following accounts'}
                </Typography>
                { profiles?.map((profile) => (
                    <FollowingUserProfile
                        key={profile?.username}
                        fullName={profile?.fullName}
                        username={profile?.username}
                    />
                ))}
            </Box>
            </Modal>
        </div>
    );
};

export default FollowersModal;

/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import {
    Box,
    Modal,
    Typography
} from '@mui/material';
import { User } from 'Type/User';
import { getUsersById } from 'Util/firebase';
import FollowingUserProfile from './FollowingUserProfile';

import { FollowersModalInterface } from './Profile.config';

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

const FollowersModal = ({
    isOpen, onClose, followers, type
}: FollowersModalInterface) => {
    const [profiles, setProfiles] = useState<Array<User>>([]);

	useEffect(() => {
		async function getSuggestedUsers() {
			const userProfiles = await getUsersById(followers);

			setProfiles(userProfiles as Array<User>);
		}

		if (followers) {
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
                    { type === 'followers' ? 'Підписники:' : 'Підписки:'}
                </Typography>
                { profiles.length ? profiles?.map((profile) => (
                    <FollowingUserProfile
                        key={profile?.username}
                        fullName={profile?.fullName}
                        username={profile?.username}
                        userId={profile?.userId}
                        docId={profile?.docId}
                    />
                )) : <h4 className="FollowersModal__NoUsers">Нажаль, тут нікого немає</h4>}
            </Box>
            </Modal>
        </div>
    );
};

export default FollowersModal;

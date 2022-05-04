/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { getUserAvatar } from 'Util/firebase';

export function useUserAvatar(username: string) {
	const [avatar, setAvatar] = useState<string | null>();

	useEffect(() => {
		async function setUserAvatar() {
			const avatar = await getUserAvatar(username);
			setAvatar(avatar);
		}
		if (username) {
			setUserAvatar();
		}
	}, [username]);

	return { avatar };
}

/* eslint-disable no-plusplus */
export function seedDatabase(firebase) {
    const users = [
      {
        userId: 'gnG2ih3kqiMxOEhFGwbpyd5Ihs33',
        username: 'st0n1k',
        fullName: 'Alexey Glazkov',
        emailAddress: 'alexey@platoanalytics.com',
        following: ['2'],
        followers: ['2', '3'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'fairlizz',
        fullName: 'Liza Dombrovskaya',
        emailAddress: 'lizadom@gmail.com',
        following: [],
        followers: ['gnG2ih3kqiMxOEhFGwbpyd5Ihs33'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'vasyapupkin',
        fullName: 'Vasya Pupkin',
        emailAddress: 'vasya@gmail.com',
        following: [],
        followers: ['gnG2ih3kqiMxOEhFGwbpyd5Ihs33'],
        dateCreated: Date.now()
      }
    ];

    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }

    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('posts')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/raphael/${i}.jpg`,
          caption: 'Test Caption',
          likes: [],
          comments: [
            {
              displayName: 'st0n1k',
              comment: 'st0n1k commented this'
            },
            {
              displayName: 'fairlizz',
              comment: 'fairlizz commented this'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }

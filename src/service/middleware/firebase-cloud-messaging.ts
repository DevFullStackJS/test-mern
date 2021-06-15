// import * as admin from 'firebase-admin';

const key = require('../../../..json');

// export const initFirebaseSdk = () =>
//   admin.initializeApp({
//     credential: admin.credential.cert(key),
//   });

// export const sendNotification = async ({ tokens, title, body }) => {
//   const messaging = admin.messaging();

//   try {
//     const data = await messaging.sendToDevice(tokens, {
//       notification: { title, body },
//     });

//     return data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

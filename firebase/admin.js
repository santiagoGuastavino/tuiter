const admin = require('firebase-admin')

const serviceAccount = JSON.parse(process.env.FIREBASE_KEYS)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export const firestore = admin.firestore()

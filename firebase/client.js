import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  Timestamp
} from 'firebase/firestore'
import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDt1rUHaV9HPDkLGRljyJdzBBLFH9VcTl8',
  authDomain: 'tuiter-790ae.firebaseapp.com',
  projectId: 'tuiter-790ae',
  storageBucket: 'tuiter-790ae.appspot.com',
  messagingSenderId: '780072459124',
  appId: '1:780072459124:web:a921f01d28e8ea5c29ea21',
  measurementId: 'G-6G9EH7YSC7'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  return {
    avatar: user.photoURL,
    username: user.displayName,
    email: user.email,
    uid: user.uid
  }
}

export const onFirebaseAuthStateChange = (onChange) => {
  const auth = getAuth()
  return onAuthStateChanged(auth, (user) => {
    onChange(user && mapUserFromFirebaseAuthToUser(user))
  })
}

export const loginWithGitHub = () => {
  const gitHubProvider = new GithubAuthProvider()
  gitHubProvider.setCustomParameters(firebaseConfig)
  const auth = getAuth()
  return signInWithPopup(auth, gitHubProvider)
}

export const addTuit = async ({ avatar, content, userId, username }) => {
  await addDoc(collection(db, 'tuits'), {
    avatar,
    content,
    userId,
    username,
    createdAt: Timestamp.fromDate(new Date()),
    likeCount: 0,
    shareCount: 0
  })
}

export const fetchLatestTuits = async () => {
  const latestTuitsQuery = query(collection(db, 'tuits'), orderBy('createdAt', 'desc'))
  const { docs } = await getDocs(latestTuitsQuery)
  try {
    return docs.map(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      return {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const uploadImage = (file) => {
  const now = Date.now()
  const storageRef = ref(storage, `images/${now}_${file.name}`)
  const task = uploadBytesResumable(storageRef, file)
  return task
}

export const getImgURL = (task, callback) => {
  getDownloadURL(ref(storage, task._metadata.fullPath))
    .then((url) => {
      return callback(url)
    })
    .catch(err => console.log(err))
}

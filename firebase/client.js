import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GithubAuthProvider,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDt1rUHaV9HPDkLGRljyJdzBBLFH9VcTl8",
    authDomain: "tuiter-790ae.firebaseapp.com",
    projectId: "tuiter-790ae",
    storageBucket: "tuiter-790ae.appspot.com",
    messagingSenderId: "780072459124",
    appId: "1:780072459124:web:a921f01d28e8ea5c29ea21",
    measurementId: "G-6G9EH7YSC7"
}

initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
    return {
        avatar: user.photoURL,
        username: user.displayName,
        email: user.email
    }
}

export const loginWithGitHub = () => {
    const gitHubProvider = new GithubAuthProvider()
    gitHubProvider.setCustomParameters(firebaseConfig)
    const auth = getAuth()
    return signInWithPopup(auth, gitHubProvider)
        .then(mapUserFromFirebaseAuthToUser(user.user))
        .catch(err => console.log(err))
}

export const onFirebaseAuthStateChange = (onChange) => {
    const auth = getAuth()
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            const normalizedUser = mapUserFromFirebaseAuthToUser(user)
            onChange(normalizedUser)
        } else {
            return
        }
    })
}
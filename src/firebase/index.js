import firebase from 'firebase/app'
import 'firebase/auth/'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'



export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  projectId: process.env.VUE_APP_PROJECT_ID,
})


export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get() {
      return firebaseApp
    }
  })

}

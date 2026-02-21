import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyD1wovIcWbJuNJn2NHtHPkA2qMV9037HsQ",
  authDomain: "cinema-brasileiro-a0844.firebaseapp.com",
  projectId: "cinema-brasileiro-a0844",
  storageBucket: "cinema-brasileiro-a0844.firebasestorage.app",
  messagingSenderId: "654559022176",
  appId: "1:654559022176:web:4916612178d192ed2d4705",
  measurementId: "G-BNKGN182P1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)


export default app
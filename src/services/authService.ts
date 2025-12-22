import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
  } from 'firebase/auth'
  import { auth } from '../config/firebase'
  
  // Cadastro - signUp - Cadastro de usuário
  export const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error: any) {
      // Firebase já verifica email duplicado automaticamente
      return { user: null, error: error.message }
    }
  }
  
  // Login - signIn - Login de usuário
  export const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }
  
  // Logout - signOutUser - Logout de usuário
  export const signOutUser = async () => {
    try {
      await signOut(auth)
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }
  
  // onAuthChange - Observar mudanças no estado de autenticação
  export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback)
  }
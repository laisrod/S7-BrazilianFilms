import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthChange } from '../../services/authService'
import { setUser } from '../../store/slices/authSlice'
import type { AppDispatch } from '../../store/store'
//responsável por manter o Redux sincronizado com o Firebase.
//AuthListener - Sincronização de Estado
const AuthListener = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // onAuthChange - Observar mudanças no estado de autenticação
    const unsubscribe = onAuthChange((user) => {
      dispatch(setUser(user))
    })

    return () => unsubscribe()
  }, [dispatch])

  return null // Componente invisível
}

export default AuthListener
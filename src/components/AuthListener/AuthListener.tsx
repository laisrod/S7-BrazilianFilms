import { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { onAuthChange } from '../../services/authService'
import { setUser } from '../../store/slices/authSlice'
//responsável por manter o Redux sincronizado com o Firebase.
//AuthListener - Sincronização de Estado
const AuthListener = () => {
  const dispatch = useAppDispatch()

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
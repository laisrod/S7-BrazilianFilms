import { useNavigate, useLocation } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (path: string, replace = false) => {
    navigate(path, { replace })
  }

  const goBack = () => {
    navigate(-1)
  }

  const getFromPath = (defaultPath = '/welcome') => {
    return (location.state as { from?: { pathname: string } })?.from?.pathname || defaultPath
  }

  const goToFrom = (defaultPath = '/welcome') => {
    const from = getFromPath(defaultPath)
    navigate(from, { replace: true })
  }

  return {
    navigate,
    location,
    goTo,
    goBack,
    getFromPath,
    goToFrom,
  }
}


import { useNavigate, useLocation, type Location } from 'react-router-dom'

const getFromPathFromState = (location: Location, defaultPath: string): string => {
  if (!location.state) {
    return defaultPath
  }

  const state = location.state as { from?: { pathname: string } }

  if (!state.from) {
    return defaultPath
  }

  if (!state.from.pathname) {
    return defaultPath
  }

  return state.from.pathname
}

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
    return getFromPathFromState(location, defaultPath)
  }

  const goToFrom = (defaultPath = '/welcome') => {
    const from = getFromPath(defaultPath)
    goTo(from, true)
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


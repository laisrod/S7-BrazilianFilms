import { useLocation } from 'react-router-dom'
import { useNavigation } from '../../hooks/useNavigation'
import '../../styles/NavBar.css'

const HIDDEN_ROUTES = ['/login', '/register', '/welcome']

const Navbar = () => {
  const { goTo } = useNavigation()
  const location = useLocation()

  if (HIDDEN_ROUTES.includes(location.pathname)) {
    return null
  }

  const handleGoToWelcome = () => {
    goTo('/welcome')
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div 
          className="navbar__logo" 
          onClick={handleGoToWelcome}
          style={{ cursor: 'pointer' }}
        >
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar
import { useNavigation } from '../../hooks/useNavigation'
import '../../styles/NavBar.css'

const Navbar = () => {
  const { goTo } = useNavigation()

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
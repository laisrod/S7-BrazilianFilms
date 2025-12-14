import { useNavigate } from 'react-router-dom'
import '../../styles/NavBar.css'

const Navbar = () => {
  const navigate = useNavigate()

  const handleGoToWelcome = () => {
    navigate('/welcome')
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
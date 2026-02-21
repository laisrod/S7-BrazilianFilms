import { useNavigation } from '../../hooks/useNavigation'
import '../../styles/Welcome.css'

const Welcome = () => {
  const { goTo } = useNavigation()

  const handleGoToHome = () => {
    goTo('/home')
  }

  return (
    <div className="welcome">
      <div className="welcome__overlay" />
      <div className="welcome__content">
        <button
          onClick={handleGoToHome}
          className="welcome__button"
          type="button"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Welcome

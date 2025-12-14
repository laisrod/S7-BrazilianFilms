import { useNavigate } from 'react-router-dom'
import '../../styles/Welcome.css'

const Welcome = () => {
    const navigate = useNavigate()

    const handleGoToHome = () => {
        navigate('/home')
    }

    return (
        <div className="welcome">
            <div className='welcome__container'>
                <h1 className="welcome__title">Bem-vindo ao Cinema Brasileiro</h1>
                <p className="welcome__subtitle">
                Descubra os grandes clássicos do cinema nacional
                </p>
                <button
                onClick={handleGoToHome}
                className="welcome__button"
                type="button"
                >
                    Explorar Filmes
                </button>
            </div>
        </div>
    )
}

export default Welcome

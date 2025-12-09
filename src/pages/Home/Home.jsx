import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadMovies } from '../../store/slices/moviesSlice'
import MovieList from '../../components/MovieList/MovieList'
import MovieSearch from '../../components/MovieSearch/MovieSearch'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadMovies(1))
  }, [dispatch])

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Cinema Brasileiro</h1>
        <p className="home__subtitle">Descubra os grandes clássicos do cinema nacional</p>
      </header>
      <main className="home__main">
        <MovieSearch />
        <MovieList />
      </main>
    </div>
  )
}

export default Home

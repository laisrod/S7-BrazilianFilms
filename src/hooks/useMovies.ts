import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { loadMovies, resetMovies } from '../store/slices/moviesSlice'
import { useInfiniteScroll } from './useInfiniteScroll'

export const useMovies = () => {
  const dispatch = useAppDispatch()
  const { movies, allMovies, loading, error, nextPage } = useAppSelector((state) => state.movies)

  //que carrega mais filmes
  const handleLoadMore = useCallback(() => {
    if (nextPage && !loading) {
      dispatch(loadMovies(nextPage))
    }
  }, [dispatch, nextPage, loading])

  const observerTarget = useInfiniteScroll({
    callback: handleLoadMore,
    hasMore: !!nextPage,
    loading: loading,
  })

  const initializeMovies = useCallback(() => {
    dispatch(resetMovies())
    dispatch(loadMovies(1)) //chama função do slice
  }, [dispatch])

  return {
    movies,
    allMovies,
    loading,
    error,
    nextPage,
    observerTarget,
    handleLoadMore,
    initializeMovies,
  }
}



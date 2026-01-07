import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  callback: () => void
  hasMore: boolean
  loading: boolean
  threshold?: number
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  loading,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            callback()
          }
        })
      },
      { threshold }  
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [callback, hasMore, loading, threshold])

  return observerTarget
}
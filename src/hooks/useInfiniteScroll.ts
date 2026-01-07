import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  callback: () => void
  hasMore: boolean
  loading: boolean
  threshold?: number
}

const handleIntersection = (callback: () => void, loading: boolean) => {
  return (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !loading) {
        callback()
      }
    })
  }
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  loading,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) {
      return
    }

    const targetElement = observerTarget.current

    if (!targetElement) {
      return
    }

    const handleIntersect = handleIntersection(callback, loading)
    const observer = new IntersectionObserver(handleIntersect, { threshold })

    observer.observe(targetElement)

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [callback, hasMore, loading, threshold])

  return observerTarget
}
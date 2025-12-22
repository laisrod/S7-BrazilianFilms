import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  callback: () => void      // Função a ser chamada quando chegar ao final
  hasMore: boolean          // Se há mais itens para carregar
  loading: boolean          // Se está carregando
  threshold?: number        // Porcentagem de visibilidade (0 a 1)
}

export const useInfiniteScroll = ({
  callback,
  hasMore,
  loading,
  threshold = 0.1,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Se não há mais itens, não faz nada
    if (!hasMore) return

    // Cria o IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se o elemento está visível e não está carregando
          if (entry.isIntersecting && !loading) {
            callback()  // Chama a função de carregar mais
          }
        })
      },
      { threshold }  
    )

    // Observa o elemento alvo
    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    // Limpeza: para de observar quando o componente desmonta
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [callback, hasMore, loading, threshold])

  return observerTarget  // Retorna a referência do elemento
}
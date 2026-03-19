import  { useEffect, useRef } from 'react'
import { SubscriptionCard } from './SubscriptionCard'
import { useUserSubscriptions } from '@/hooks/useUserSubscriptions'

interface Props {
  userId: string
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionModal({ userId, isOpen, onClose }: Props) {
  const { data, loading, error } = useUserSubscriptions(userId)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Fecha ao pressionar Esc
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Trava scroll do body
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="bg-gray-50 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-start px-6 py-5 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Minhas Inscrições</h2>
            {!loading && !error && (
              <p className="text-xs text-gray-400 mt-0.5">
                {data.length} {data.length === 1 ? 'inscrição encontrada' : 'inscrições encontradas'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none p-1 rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-[3px] border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Carregando inscrições...</p>
            </div>
          )}

          {/* Erro */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-1">
              <p className="text-sm font-semibold text-red-500">Erro ao carregar as inscrições.</p>
              <p className="text-xs text-gray-400">{error.message}</p>
            </div>
          )}

          {/* Vazio */}
          {!loading && !error && data.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-gray-400">Nenhuma inscrição encontrada.</p>
            </div>
          )}

          {/* Lista */}
          {!loading && !error && data.length > 0 && (
            <div className="flex flex-col gap-4">
              {data.map((sub) => (
                <SubscriptionCard key={sub._id} subscription={sub} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

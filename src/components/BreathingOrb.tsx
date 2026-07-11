import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { X, Send, Sparkles } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { apiClient } from '@/api/apiClient'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  text: string
  isAi: boolean
}

export function BreathingOrb() {
  const { isChatDrawerOpen, setChatDrawerOpen, userEmail } = useAppStore()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: "Hello. I am Mini-Me. What's on your mind?", isAi: true }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isChatDrawerOpen])

  const chatMutation = useMutation({
    mutationFn: (question: string) => apiClient.query({ question, top_k: 5, user_email: userEmail }),
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: data.answer, isAi: true }])
    },
    onError: () => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "I'm having trouble connecting to my memory banks right now.", isAi: true }])
    }
  })

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || chatMutation.isPending) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: userMessage, isAi: false }])
    setInput('')
    chatMutation.mutate(userMessage)
  }

  return (
    <>
      {/* Persistent Breathing Orb Widget */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatDrawerOpen(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
          {/* Outer glowing aura */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary opacity-30 mix-blend-screen blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Core Orb */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary to-[var(--glow-secondary)] shadow-[0_0_30px_var(--glow-primary)] border border-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6 opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Chat Drawer Overlay */}
      <AnimatePresence>
        {isChatDrawerOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] z-50 glass-panel border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_10px_var(--glow-primary)]">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Mini-Me</h2>
                </div>
                <button
                  onClick={() => setChatDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-muted hover:text-text"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[85%] rounded-2xl p-4 text-sm md:text-base leading-relaxed shadow-sm",
                      msg.isAi
                        ? "bg-white/5 border border-white/5 self-start text-text"
                        : "bg-primary/20 border border-primary/20 self-end text-text"
                    )}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {chatMutation.isPending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/5 border border-white/5 self-start text-text max-w-[85%] rounded-2xl p-4 flex gap-1"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-background/50 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Mini-Me..."
                    disabled={chatMutation.isPending}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 md:py-4 pl-6 pr-14 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm md:text-base disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || chatMutation.isPending}
                    className="absolute right-2 p-2 rounded-full bg-primary hover:bg-primary/80 disabled:bg-primary/30 disabled:cursor-not-allowed transition-colors text-white"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
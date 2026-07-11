import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { apiClient } from '@/api/apiClient'
import { format } from 'date-fns'

export function History() {
  const { data: entries, isLoading } = useQuery({
    queryKey: ['journals-all'],
    queryFn: () => apiClient.listJournals(50, 0),
  })

  // Simulated Z-Axis 3D Stack Configuration
  const stackOffset = 40; // px
  const scaleOffset = 0.05;

  return (
    <div className="h-full flex flex-col pb-32">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Z-Axis History</h1>
        <p className="text-text-muted text-lg font-light">
          Your chronological memory stack. Scroll down to look deeper into the past.
        </p>
      </header>

      <div className="flex-grow relative flex justify-center mt-10 perspective-[1000px]">
        {isLoading ? (
          <p className="text-text-muted animate-pulse">Retrieving memories...</p>
        ) : entries && entries.length > 0 ? (
          <div className="w-full max-w-2xl relative">
            {entries.map((entry: any, index: number) => {
              // Ensure we don't render too many deeply stacked items for performance
              if (index > 10) return null;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{
                    opacity: 1 - (index * 0.1),
                    y: index * stackOffset,
                    scale: 1 - (index * scaleOffset),
                    zIndex: 50 - index
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-0 w-full glass-panel p-6 md:p-8 rounded-3xl shadow-2xl cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold line-clamp-1">{entry.title}</h3>
                    {entry.created_at && (
                      <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                        {format(new Date(entry.created_at), 'MMM d, yyyy')}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted line-clamp-3 text-sm md:text-base leading-relaxed">
                    {entry.transcript}
                  </p>
                </motion.div>
              )
            })}
            {/* Provide spacing block equivalent to the stacked height */}
            <div style={{ height: `${entries.slice(0, 10).length * stackOffset + 250}px` }} />
          </div>
        ) : (
          <div className="w-full max-w-2xl glass-panel p-12 rounded-3xl text-center">
            <p className="text-text-muted italic">The memory stack is empty.</p>
          </div>
        )}
      </div>
    </div>
  )
}
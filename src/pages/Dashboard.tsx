import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { apiClient } from '@/api/apiClient'
import { format } from 'date-fns'

export function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['journals', 5],
    queryFn: () => apiClient.listJournals(5, 0),
  })

  return (
    <div className="h-full flex flex-col space-y-8 pb-32">
      <header>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-text to-primary">
          Command Center
        </h1>
        <p className="text-text-muted text-lg font-light">
          Welcome back to your Living Memory. Let's see what you've been thinking about.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Entry */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-3xl md:col-span-1 flex flex-col justify-between group"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Entry</h3>
            <p className="text-sm text-text-muted">Start a new thought thread.</p>
          </div>
          <button className="mt-8 w-full py-3 px-4 rounded-xl bg-primary/20 hover:bg-primary/40 border border-primary/50 transition-colors duration-300 text-sm font-medium">
            New Memory
          </button>
        </motion.div>

        {/* Recent Memories Summary */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-panel p-6 rounded-3xl md:col-span-2 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Recent Memories</h3>
            <span className="text-sm text-primary cursor-pointer hover:underline">View All</span>
          </div>

          <div className="flex-grow flex flex-col justify-center space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-12 bg-white/5 rounded-xl w-full"></div>
                <div className="h-12 bg-white/5 rounded-xl w-full"></div>
                <div className="h-12 bg-white/5 rounded-xl w-3/4"></div>
              </div>
            ) : data && data.length > 0 ? (
              data.map((entry: any) => (
                <div key={entry.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <span className="font-medium truncate pr-4">{entry.title}</span>
                  {entry.created_at && (
                     <span className="text-xs text-text-muted whitespace-nowrap">
                       {format(new Date(entry.created_at), 'MMM d, yyyy')}
                     </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-text-muted text-center italic">No recent memories found. Talk to Mini-Me to start recording.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
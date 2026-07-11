import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function NebulaBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-background transition-colors duration-1000" />

      {/* Primary animated orb/nebula */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px]",
          "bg-[var(--glow-primary)] opacity-30 mix-blend-screen"
        )}
      />

      {/* Secondary animated orb/nebula */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px]",
          "bg-[var(--glow-secondary)] opacity-20 mix-blend-screen"
        )}
      />
    </div>
  )
}
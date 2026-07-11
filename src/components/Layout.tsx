import { Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, History, Map as MapIcon, Moon, Sun } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { NebulaBackground } from '@/components/NebulaBackground'
import { BreathingOrb } from '@/components/BreathingOrb'
import { cn } from '@/lib/utils'

export function Layout() {
  const { theme, toggleTheme } = useAppStore()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'History', path: '/history', icon: History },
    { name: 'Roadmap', path: '/roadmap', icon: MapIcon },
    // Settings omitted for brevity, but icon is there
  ]

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      <NebulaBackground />

      {/* Left-Hand Intelligent Navigation Dock */}
      <nav className="glass-panel w-20 md:w-64 flex-shrink-0 flex flex-col justify-between py-8 px-4 z-10 transition-all duration-300">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-12 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/50 shadow-[0_0_15px_var(--glow-primary)]" />
            <h1 className="hidden md:block font-semibold tracking-wide text-lg">Living Memory</h1>
          </div>

          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group relative",
                  isActive ? "bg-white/10 text-white" : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={22} />
                    <span className="hidden md:block font-medium">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute left-0 w-1 h-full bg-primary rounded-r-md"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer actions: Theme Toggle */}
        <div className="flex flex-col gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 p-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-all duration-300"
            title={`Switch to ${theme === 'dark' ? 'Warm-Light' : 'Deep-Space Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            <span className="hidden md:block font-medium">Toggle Theme</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-0 overflow-y-auto">
        <div className="container mx-auto p-8 h-full">
          <Outlet />
        </div>
      </main>

      <BreathingOrb />
    </div>
  )
}
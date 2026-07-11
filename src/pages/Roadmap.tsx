import { motion } from 'framer-motion'

export function Roadmap() {
  // Static nodes representing the constellation map
  const nodes = [
    { id: 1, x: 20, y: 30, title: 'Origins' },
    { id: 2, x: 50, y: 15, title: 'Concept Phase' },
    { id: 3, x: 80, y: 40, title: 'Web App Pivot' },
    { id: 4, x: 40, y: 70, title: 'Backend Integration' },
    { id: 5, x: 70, y: 80, title: 'Launch' },
  ];

  // Connections between nodes
  const links = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[0], target: nodes[3] },
    { source: nodes[3], target: nodes[4] },
    { source: nodes[2], target: nodes[4] },
  ];

  return (
    <div className="h-full flex flex-col pb-32">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Constellation Roadmap</h1>
        <p className="text-text-muted text-lg font-light">
          Navigating your structural nodes and project evolution.
        </p>
      </header>

      <div className="flex-grow glass-panel rounded-3xl relative overflow-hidden flex items-center justify-center p-8 border border-white/5">
        <svg className="w-full h-[60vh] max-h-[600px] overflow-visible">
          {/* Defs for glowing effects */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Animated gradient for links */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1">
                <animate attributeName="offset" values="-1; 2" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Render Links */}
          {links.map((link, i) => (
            <motion.line
              key={`link-${i}`}
              x1={`${link.source.x}%`}
              y1={`${link.source.y}%`}
              x2={`${link.target.x}%`}
              y2={`${link.target.y}%`}
              stroke="url(#flowGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}

          {/* Render Nodes */}
          {nodes.map((node, i) => (
            <g key={`node-${node.id}`} className="cursor-pointer group">
              {/* Outer pulsing ring */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="12"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />

              {/* Core node */}
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="6"
                fill="var(--color-primary)"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                className="group-hover:fill-white transition-colors duration-300"
              />

              {/* Node Title */}
              <motion.text
                x={`${node.x}%`}
                y={`${node.y + 6}%`}
                textAnchor="middle"
                fill="var(--color-text)"
                className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
              >
                {node.title}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
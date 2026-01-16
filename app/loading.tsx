'use client'
import { Activity, Heart, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="relative mb-12">
          {/* Main animated circle */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-transparent rounded-full bg-gradient-conic from-transparent via-blue-500 to-transparent animate-spin"></div>
            
            {/* Middle ring */}
            <motion.div 
              className="absolute inset-4 border-4 border-cyan-400/30 rounded-full"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Inner pulsing core */}
            <motion.div 
              className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Floating icons around the circle */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[Heart, Shield, Activity, Zap].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${index * 90}deg) translateX(100px) rotate(-${index * 90}deg)`,
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              >
                <Icon className="w-6 h-6 text-cyan-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.h2 
                className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent tracking-tight"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ 
                  backgroundSize: '200% auto'
                }}
              >
                Managemed<span className="text-cyan-400">BD</span>
              </motion.h2>
              
              <motion.p 
                className="text-slate-300 text-lg mt-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading your experience
              </motion.p>
            </div>
            
            {/* Progress indicator */}
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Stats loading animation */}
            <div className="flex justify-center gap-8 mt-8">
              {['Connecting', 'Securing', 'Optimizing'].map((text, i) => (
                <motion.div
                  key={text}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="w-2 h-8 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full mb-2">
                    <motion.div 
                      className="w-full h-full bg-gradient-to-t from-cyan-300 to-cyan-500 rounded-full"
                      animate={{ height: ['0%', '100%', '0%'] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
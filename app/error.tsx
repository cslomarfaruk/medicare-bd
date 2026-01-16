// app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.5, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          <div className="relative inline-flex p-6 rounded-3xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-100 shadow-2xl shadow-red-100/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <AlertTriangle className="w-16 h-16 text-rose-600 drop-shadow-lg" />
            </motion.div>
            <Shield className="absolute -top-2 -right-2 w-8 h-8 text-rose-400 animate-pulse" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6"
        >
          Something Went Wrong
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 mb-10 text-lg leading-relaxed font-medium"
        >
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-10"
        >
          <Button
            onClick={reset}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 via-sky-500 to-cyan-500 hover:from-blue-700 hover:via-sky-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <RefreshCw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full group border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
            size="lg"
          >
            <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Return to Home
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100 rounded-2xl shadow-lg backdrop-blur-sm"
        >
          <p className="text-sm text-slate-500 font-medium mb-3">
            If the problem persists, contact our support team:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@medico.ai.app" 
              className="group inline-flex items-center text-green-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <span className="inline-block p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 mr-3 transition-colors">
                ✉️
              </span>
              support@medico.ai.app
            </a>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <a 
              href="tel:+880 1839-467728" 
              className="group inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              <span className="inline-block p-2 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 mr-3 transition-colors">
                📞
              </span>
              +880 1839-467728
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
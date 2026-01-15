'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, Navigation, Compass, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 overflow-hidden">
      
      {/* Floating map background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        {/* 404 */}
        <div className="relative mb-12">
          <motion.div
            className="text-[180px] font-black tracking-tighter leading-none select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-br from-slate-900/20 to-slate-900/5 bg-clip-text text-transparent">
              404
            </span>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Compass className="w-32 h-32 text-blue-400/30" />
          </motion.div>

          <MapPin className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-12 h-12 text-rose-500 drop-shadow-lg" />
        </div>

        <h1 className="text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Page Not Found
        </h1>

        <p className="text-slate-600 mb-10 text-lg max-w-md mx-auto">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="w-5 h-5 mr-3" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/#features">
              <Search className="w-5 h-5 mr-3" />
              Explore Features
            </Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="w-full">
            <Link href="/">
              <Navigation className="w-5 h-5 mr-3" />
              Contact Support
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

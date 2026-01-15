// app/(admin)/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield,
  AlertCircle,
  LogIn,
  Key
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_token', data.token)
          localStorage.setItem('admin_user', JSON.stringify(data.user))
          document.cookie = `admin_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`
        }
        
        toast.success('Login successful!')
        router.push('/internal-dashboard')
        router.refresh()
      } else {
        toast.error(data.message || 'Login failed, please check your email/password')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Server error, please try again later')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-cyan-500 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            MediCare<span className="text-cyan-400">BD</span>
            <span className="text-sm text-gray-400 block mt-1">Admin Portal</span>
          </h1>
          <p className="text-gray-400">
            Internal System Access
          </p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Admin Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 mt-2"
                />
              </div>
              <div>
                <Label className="text-gray-300">Password</Label>
                <div className="relative mt-2">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
                    {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-cyan-600 hover:bg-cyan-700">
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
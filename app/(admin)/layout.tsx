// app/(admin)/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

const inter = Inter({ subsets: ['latin'] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthReady(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    // Redirect to login
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') {
    return (
<html lang="en">
        <body className={`${inter.className} bg-gray-100`}>
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    );
  }
  
  if (!isAuthReady) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      )
  }

  return (
    <html lang="bn">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="flex h-screen">
          <AdminSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader 
              onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
              onLogout={handleLogout}
            />
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
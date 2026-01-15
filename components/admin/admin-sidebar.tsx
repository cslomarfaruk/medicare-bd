// components/admin/admin-sidebar.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  Users,
  BarChart2,
  Settings,
  LifeBuoy,
  X,
  Shield,
  Hospital,
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/internal-dashboard', icon: Home, label: 'Dashboard' },
  { href: '/internal-dashboard/leads', icon: Users, label: 'Lead Management' },
  { href: '/internal-dashboard/patients', icon: Hospital, label: 'Patient Management' },
  { href: '/internal-dashboard/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/internal-dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-300 lg:static lg:inset-auto lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex h-116 items-center justify-between border-b border-gray-800 px-6">
          <Link href="/internal-dashboard" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-cyan-400" />
            <span className="text-lg font-bold">
              MediCare<span className="text-cyan-400">BD</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          <Link
            href="/internal-dashboard/support"
            className="flex items-center rounded-md px-4 py-2.5 text-sm font-medium hover:bg-gray-800"
          >
            <LifeBuoy className="mr-3 h-5 w-5" />
            Support
          </Link>
        </div>
      </aside>
    </>
  )
}
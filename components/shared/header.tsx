// components/shared/header.tsx
'use client'

import { MouseEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'nav.features', sectionId: 'features' },
  { name: 'nav.ai', sectionId: 'ai' },
  // Map "How it works" to the problems section for now
  { name: 'nav.how', sectionId: 'problems' },
  { name: 'nav.pricing', sectionId: 'pricing' },
  { name: 'nav.faq', sectionId: 'faq' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en')
  }

  const handleNavClick = (e: MouseEvent, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const rect = element.getBoundingClientRect()
      const offsetPosition = rect.top + window.scrollY - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      window.history.replaceState(null, '', `#${sectionId}`)
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    // Set initial active section from hash
    if (typeof window !== 'undefined' && window.location.hash) {
      setActiveSection(window.location.hash.replace('#', ''))
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MB</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Managemed<span className="text-green-600">BD</span>
                </span>
                <div className="text-xs text-gray-500 -mt-1 font-bengali">
                  For Bangladesh Healthcare
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.sectionId
              return (
                <Link
                  key={item.name}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={cn(
                    'px-4 py-2 text-sm rounded-lg transition-colors font-medium relative',
                    'text-gray-700 hover:text-green-600 hover:bg-blue-50',
                    isActive &&
                      'text-blue-700 bg-white/90 shadow-[0_0_18px_rgba(59,130,246,0.35)] border border-blue-200'
                  )}
                >
                  {t(item.name)}
                </Link>
              )
            })}
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-2 flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
              <span className="text-gray-400">|</span>
              <span className={cn(
                "text-xs font-medium",
                language === 'en' ? 'text-gray-400' : 'text-gray-700'
              )}>
                {language === 'en' ? 'বাংলা' : 'English'}
              </span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="tel:+8801700000000" 
              className="text-sm text-gray-600 hover:text-green-600 font-medium"
            >
              📞 +880 1839-467728
            </Link>
            <Button 
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2 text-sm bg-gradient-to-r from-green-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md hover:shadow-lg"
            >
              {t('hero.demo')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-gray-200 pt-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`#${item.sectionId}`}
                  className="block px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  onClick={(e) => {
                    handleNavClick(e, item.sectionId)
                    setMobileMenuOpen(false)
                  }}
                >
                  {t(item.name)}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">Language</span>
                  </div>
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'বাংলা' : 'English'}
                  </span>
                </button>
                
                <Link 
                  href="tel:+8801700000000" 
                  className="block px-4 py-2.5 text-gray-600 hover:text-green-600 font-medium"
                >
                  📞 +880 1839-467728
                </Link>
                
                <Button 
                  onClick={() => {
                    document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
                    setMobileMenuOpen(false)
                  }}
                  className="w-full mt-2 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white"
                >
                  {t('hero.demo')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
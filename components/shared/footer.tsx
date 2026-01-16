// components/shared/footer.tsx
import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'

const footerLinks = {
  পণ্য: [
    { name: 'ক্লিনিক সফটওয়্যার', href: '#features' },
    { name: 'ডায়াগনস্টিক সেন্টার', href: '#features' },
    { name: 'হাসপাতাল ম্যানেজমেন্ট', href: '#features' },
    { name: 'এআই ফিচার', href: '#ai' },
    { name: 'মূল্যসূচী', href: '#pricing' },
  ],
  সংস্থা: [
    { name: 'আমাদের সম্পর্কে', href: '#about' },
    { name: 'ব্লগ', href: '#blog' },
    { name: 'ক্যারিয়ার', href: '#career' },
    { name: 'যোগাযোগ', href: '#contact' },
    { name: 'গোপনীয়তা নীতি', href: '#privacy' },
  ],
  সাহায্য: [
    { name: 'ডকুমেন্টেশন', href: '#docs' },
    { name: 'ভিডিও টিউটোরিয়াল', href: '#tutorials' },
    { name: 'সাপোর্ট', href: '#support' },
    { name: 'সাধারণ প্রশ্ন', href: '#faq' },
    { name: 'কমিউনিটি', href: '#community' },
  ],
  পার্টনার: [
    { name: 'ডেভেলপার', href: '#developers' },
    { name: 'অ্যাফিলিয়েট', href: '#affiliate' },
    { name: 'রিসেলার', href: '#reseller' },
    { name: 'ইন্টিগ্রেশন', href: '#integrations' },
    { name: 'API ডক্স', href: '#api' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">MB</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">medico<span className="text-cyan-400">BD</span></h2>
                <p className="text-gray-400 text-sm font-bengali">
                  বাংলাদেশের চিকিৎসকদের জন্য
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed font-bengali">
              বাংলাদেশের প্রথম এআই-পাওয়ারড ক্লিনিক ম্যানেজমেন্ট সফটওয়্যার। 
              আমরা চিকিৎসা সেবাকে ডিজিটাল রূপান্তরের মাধ্যমে সহজ, নিরাপদ ও কার্যকরী করছি।
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3" />
                <span className="font-bengali">০১৭০০-০০০০০০ (সকাল ৯টা - রাত ১০টা)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3" />
                <span>support@medico.ai.app</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="font-bengali">গুলশান, ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6 font-bengali">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors font-bengali"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-400 text-sm font-bengali">
              © {currentYear} medico.ai. সর্বস্বত্ব সংরক্ষিত। 
              <span className="ml-2">Made with <Heart className="inline w-4 h-4 text-rose-500" /> in Bangladesh</span>
            </p>
            <div className="flex space-x-4 mt-3 text-sm text-gray-400 font-bengali">
              <Link href="#terms" className="hover:text-white">সেবার শর্তাবলী</Link>
              <Link href="#privacy" className="hover:text-white">গোপনীয়তা নীতি</Link>
              <Link href="#cookies" className="hover:text-white">কুকি নীতি</Link>
            </div>
          </div>

          {/* Social Links & App Badges */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            {/* App Store Badges */}
            <div className="flex space-x-3">
              <a href="#" className="block">
                <div className="bg-black hover:bg-gray-900 rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="text-xs text-gray-400 font-bengali">আপলোড হচ্ছে</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-black hover:bg-gray-900 rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors">
                  <div className="text-2xl">📱</div>
                  <div>
                    <div className="text-xs text-gray-400 font-bengali">আপলোড হচ্ছে</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Seals */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">১০০%</div>
              <div className="text-sm text-gray-400 font-bengali">ডাটা সুরক্ষা</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">২৪/৭</div>
              <div className="text-sm text-gray-400 font-bengali">সাপোর্ট</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">৯৯.৯%</div>
              <div className="text-sm text-gray-400 font-bengali">আপটাইম</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">৫০০+</div>
              <div className="text-sm text-gray-400 font-bengali">সন্তুষ্ট চিকিৎসক</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
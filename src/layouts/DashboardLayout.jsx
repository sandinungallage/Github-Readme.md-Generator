import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCode2, LayoutDashboard, User, LogOut, Bell, ChevronDown, Clock, Info } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useState, useRef, useEffect } from 'react'

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()
  const location = useLocation()
  
  const [logoMenuOpen, setLogoMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setLogoMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-transparent">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-slate-50 dark:bg-zinc-950">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Floating Top Navbar */}
      <header className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="h-16 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 shadow-lg shadow-slate-200/50 dark:shadow-black/20 flex items-center justify-between px-6">
          
          <div className="flex items-center gap-6">
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setLogoMenuOpen(!logoMenuOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white shadow-md group-hover:scale-105 transition-transform">
                  <FileCode2 size={20} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-zinc-100 dark:to-zinc-400">
                    README Eng.
                  </span>
                  <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${logoMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {logoMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3 w-56 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-1.5 flex flex-col">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setLogoMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-slate-500 dark:text-zinc-400" />
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        onClick={() => setLogoMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <User size={16} className="text-slate-500 dark:text-zinc-400" />
                        Profile
                      </Link>
                      <button 
                        onClick={() => setLogoMenuOpen(false)}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Clock size={16} className="text-slate-500 dark:text-zinc-400" />
                        Recent Works
                      </button>
                      <div className="h-px bg-slate-200 dark:bg-zinc-800 my-1 mx-2" />
                      <Link 
                        to="/about-us"
                        onClick={() => setLogoMenuOpen(false)}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Info size={16} className="text-slate-500 dark:text-zinc-400" />
                        About Us
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="hidden md:flex items-center gap-1 ml-6 border-l border-slate-200 dark:border-zinc-700 pl-6">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-900 dark:hover:text-zinc-100 relative transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
            </button>
            
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-zinc-800 mx-1"></div>

            <Link to="/profile" className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-semibold text-sm shadow-sm border border-white/50 dark:border-zinc-700/50 group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 hidden sm:block">
                {user?.name || 'User'}
              </span>
            </Link>

            <button 
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors ml-1"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 mt-4 custom-scrollbar z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

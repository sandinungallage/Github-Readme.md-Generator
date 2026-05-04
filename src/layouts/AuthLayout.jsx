import { Outlet } from 'react-router-dom'
import { FileCode2 } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Left side - Graphic/Brand */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white lg:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
            <FileCode2 size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">README Engineer</h1>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold leading-tight">
            Build production-ready documentation in seconds.
          </h2>
          <p className="mt-4 text-blue-100">
            Join thousands of developers using our AI-powered generator to craft perfect READMEs.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

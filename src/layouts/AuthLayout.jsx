import { Outlet } from 'react-router-dom'
import { FileCode2 } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950">
      {/* Left side - Clean Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-slate-900 dark:bg-zinc-900 p-12 text-white lg:flex relative overflow-hidden">
        {/* Subtle grid pattern for a professional look */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f4f59 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2 shadow-sm">
            <FileCode2 size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">README Engineer</h1>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Build production-ready documentation in seconds.
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Join thousands of developers using our intelligent generator to craft perfect READMEs with a modern, streamlined workflow.
          </p>
        </div>
        
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-500">© 2026 README Engineer Inc.</p>
        </div>
      </div>

      {/* Right side - Form Container */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

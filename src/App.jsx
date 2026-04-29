import { useState } from 'react'
import Form from './components/Form'
import Preview from './components/Preview'
import { FileCode2, Copy, Download } from 'lucide-react'
import { generateReadme } from './lib/readmeEngine'

function App() {
  const [projectData, setProjectData] = useState({
    title: 'Awesome Project',
    description: 'A fantastic project that does amazing things.',
    projectType: 'web',
    features: ['Responsive UI', 'Dark Mode'],
    techStack: ['React', 'Tailwind CSS'],
    endpoints: [], // for APIs
  })

  const markdownContent = generateReadme(projectData)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent)
      // Custom elegant notification could go here
      alert('Markdown copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      alert('Failed to copy markdown. Please try again.')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="glow-orb top-[-10%] left-[-10%]"></div>
      <div className="glow-orb-2 bottom-[-10%] right-[-10%]"></div>

      {/* Header */}
      <header className="glass-panel border-b-0 border-white/5 sticky top-0 z-10 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-violet-500/20">
              <FileCode2 size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gradient animated-gradient-bg">
              README Engineer
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Copy size={16} />
              Copy
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 cursor-pointer"
            >
              <Download size={16} />
              Download .md
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Split View */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 flex flex-col lg:flex-row gap-8 h-[calc(100vh-5rem)]">
        {/* Left Column: Form Input */}
        <section className="w-full lg:w-1/2 flex flex-col h-full glass-panel rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h2 className="font-bold text-slate-200 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
              Configuration
            </h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            <Form projectData={projectData} setProjectData={setProjectData} />
          </div>
        </section>

        {/* Right Column: Live Preview */}
        <section className="w-full lg:w-1/2 flex flex-col h-full glass-panel rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h2 className="font-bold text-slate-200 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Live Preview
            </h2>
          </div>
          <div className="p-8 overflow-y-auto flex-1 prose prose-invert prose-violet max-w-none bg-slate-950/30 custom-scrollbar">
            <Preview markdown={markdownContent} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

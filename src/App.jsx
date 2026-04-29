import { useState } from 'react'
import Form from './components/Form'
import Preview from './components/Preview'
import { FileCode2 } from 'lucide-react'
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <FileCode2 size={24} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              README Engineer
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              Copy Markdown
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
              Download .md
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Split View */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)]">
        {/* Left Column: Form Input */}
        <section className="w-full lg:w-1/2 flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Project Configuration</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
            <Form projectData={projectData} setProjectData={setProjectData} />
          </div>
        </section>

        {/* Right Column: Live Preview */}
        <section className="w-full lg:w-1/2 flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Live Preview</h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1 prose prose-slate max-w-none bg-slate-50/30 custom-scrollbar">
            <Preview markdown={markdownContent} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

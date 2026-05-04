import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Plus, X } from 'lucide-react'
import { generateProjectReadme } from '../lib/readmeEngine'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Card, CardContent } from '../components/common/Card'
import { useToastStore } from '../store/toastStore'
import Preview from '../components/Preview' // Assuming this still exists and works

export default function ProjectReadme() {
  const [projectData, setProjectData] = useState({
    title: 'Awesome Project',
    description: 'A fantastic project that does amazing things.',
    techStack: ['React', 'Node.js'],
    features: ['Responsive UI', 'Authentication'],
    repoUrl: 'https://github.com/user/awesome-project.git',
    license: 'MIT License'
  })

  const [newTech, setNewTech] = useState('')
  const [newFeature, setNewFeature] = useState('')

  const addToast = useToastStore((state) => state.addToast)
  const markdownContent = generateProjectReadme(projectData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProjectData(prev => ({ ...prev, [name]: value }))
  }

  const addTech = (e) => {
    e.preventDefault()
    if (!newTech.trim()) return
    setProjectData(prev => ({ ...prev, techStack: [...prev.techStack, newTech.trim()] }))
    setNewTech('')
  }

  const removeTech = (index) => {
    setProjectData(prev => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== index) }))
  }

  const addFeature = (e) => {
    e.preventDefault()
    if (!newFeature.trim()) return
    setProjectData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }))
    setNewFeature('')
  }

  const removeFeature = (index) => {
    setProjectData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent)
      addToast({ title: 'Copied!', description: 'Markdown copied to clipboard.', type: 'success' })
    } catch (err) {
      addToast({ title: 'Error', description: 'Failed to copy text.', type: 'error' })
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
    addToast({ title: 'Downloaded', description: 'Your README file is downloading.', type: 'info' })
  }

  return (
    <div className="space-y-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Project README</h1>
          <p className="text-slate-500 dark:text-zinc-400">Configure your repository documentation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-[500px]">
        {/* Editor Side */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-slate-200 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-zinc-900/50">
              <h2 className="font-medium text-slate-800 dark:text-zinc-200">Configuration</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
              
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Project Title</label>
                <Input name="title" value={projectData.title} onChange={handleChange} placeholder="e.g. SmartCampus API" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Description</label>
                <textarea 
                  name="description" value={projectData.description} onChange={handleChange} rows={3}
                  className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-500 resize-none"
                  placeholder="A short, catchy description..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Repository URL</label>
                <Input name="repoUrl" value={projectData.repoUrl} onChange={handleChange} placeholder="https://github.com/user/repo.git" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">License</label>
                <Input name="license" value={projectData.license} onChange={handleChange} placeholder="MIT License" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Tech Stack</label>
                <form onSubmit={addTech} className="flex gap-3">
                  <Input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="e.g. React" />
                  <Button type="submit" variant="secondary" size="icon"><Plus size={18} /></Button>
                </form>
                <div className="flex flex-wrap gap-2 pt-1">
                  {projectData.techStack.map((tech, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-300">
                      {tech}
                      <button type="button" onClick={() => removeTech(i)} className="text-slate-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Features</label>
                <form onSubmit={addFeature} className="flex gap-3">
                  <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="e.g. JWT Auth" />
                  <Button type="submit" variant="secondary" size="icon"><Plus size={18} /></Button>
                </form>
                <ul className="space-y-2 pt-1">
                  {projectData.features.map((feature, i) => (
                    <li key={i} className="group flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-zinc-300">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{feature}
                      </span>
                      <button type="button" onClick={() => removeFeature(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </Card>
        </motion.div>

        {/* Preview Side */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-slate-200 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
              <h2 className="font-medium text-slate-800 dark:text-zinc-200">Live Preview</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-8 prose prose-slate dark:prose-invert max-w-none custom-scrollbar bg-white dark:bg-zinc-950">
              <Preview markdown={markdownContent} />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Share2 } from 'lucide-react'
import Form from '../components/Form'
import Preview from '../components/Preview'
import { generateReadme } from '../lib/readmeEngine'
import { Button } from '../components/common/Button'
import { useToastStore } from '../store/toastStore'
import { Card, CardContent } from '../components/common/Card'

export default function Dashboard() {
  const [projectData, setProjectData] = useState({
    title: 'Awesome Project',
    description: 'A fantastic project that does amazing things.',
    projectType: 'web',
    features: ['Responsive UI', 'Dark Mode'],
    techStack: ['React', 'Tailwind CSS'],
    endpoints: [],
  })

  const addToast = useToastStore((state) => state.addToast)
  const markdownContent = generateReadme(projectData)

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
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Workspace</h1>
          <p className="text-slate-500 dark:text-slate-400">Configure your project details and preview the markdown.</p>
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
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-slate-200 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-zinc-900/50">
              <h2 className="font-medium text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                Configuration
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <Form projectData={projectData} setProjectData={setProjectData} />
            </div>
          </Card>
        </motion.div>

        {/* Preview Side */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <Card className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-slate-200 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
              <h2 className="font-medium text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                Live Preview
              </h2>
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

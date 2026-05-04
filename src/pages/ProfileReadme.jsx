import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Plus, X, Save } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateProfileReadme } from '../lib/readmeEngine'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Card, CardContent } from '../components/common/Card'
import { useToastStore } from '../store/toastStore'
import { useProjectStore } from '../store/projectStore'
import Preview from '../components/Preview'

export default function ProfileReadme() {
  const location = useLocation()
  const navigate = useNavigate()
  const addToast = useToastStore((state) => state.addToast)
  const saveProject = useProjectStore((state) => state.saveProject)

  // Initialize from location state if editing an existing project
  const existingProject = location.state?.project
  const [projectId] = useState(existingProject?.id || crypto.randomUUID())

  const [profileData, setProfileData] = useState(existingProject?.data || {
    name: 'Sandin Unethmika',
    subtitle: 'Frontend Engineer & UI/UX Designer',
    currentWork: 'README Engineer',
    currentWorkLink: 'https://github.com',
    learning: 'Advanced React Patterns, Framer Motion',
    skills: ['JavaScript', 'React', 'Tailwind CSS', 'Node.js'],
    email: 'hello@example.com',
    socials: [{ platform: 'GitHub', url: 'https://github.com' }],
    funFact: 'I drink way too much coffee ☕'
  })

  const [newSkill, setNewSkill] = useState('')
  const [newSocialPlatform, setNewSocialPlatform] = useState('LinkedIn')
  const [newSocialUrl, setNewSocialUrl] = useState('')

  const markdownContent = generateProfileReadme(profileData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const addSkill = (e) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    setProfileData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
    setNewSkill('')
  }

  const removeSkill = (index) => {
    setProfileData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
  }

  const addSocial = (e) => {
    e.preventDefault()
    if (!newSocialUrl.trim()) return
    setProfileData(prev => ({ 
      ...prev, 
      socials: [...prev.socials, { platform: newSocialPlatform, url: newSocialUrl.trim() }] 
    }))
    setNewSocialUrl('')
  }

  const removeSocial = (index) => {
    setProfileData(prev => ({ ...prev, socials: prev.socials.filter((_, i) => i !== index) }))
  }

  const handleSaveDraft = () => {
    saveProject({
      id: projectId,
      title: `${profileData.name || 'Untitled'}'s Profile`,
      type: 'profile',
      status: 'draft',
      data: profileData
    })
    addToast({ title: 'Draft Saved', description: 'Your profile README has been saved to Recent Works.', type: 'success' })
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
    saveProject({
      id: projectId,
      title: `${profileData.name || 'Untitled'}'s Profile`,
      type: 'profile',
      status: 'completed',
      data: profileData
    })

    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addToast({ title: 'Downloaded', description: 'Your profile README is downloading and saved as completed.', type: 'info' })
  }

  return (
    <div className="space-y-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Profile README</h1>
          <p className="text-slate-500 dark:text-zinc-400">Generate a beautiful GitHub profile landing page.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleSaveDraft} className="bg-white dark:bg-zinc-900">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handleCopy} className="bg-white dark:bg-zinc-900">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Name</label>
                  <Input name="name" value={profileData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Subtitle</label>
                  <Input name="subtitle" value={profileData.subtitle} onChange={handleChange} placeholder="e.g. Frontend Developer" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Current Work</label>
                  <Input name="currentWork" value={profileData.currentWork} onChange={handleChange} placeholder="e.g. Acme Corp" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Work Link</label>
                  <Input name="currentWorkLink" value={profileData.currentWorkLink} onChange={handleChange} placeholder="https://..." />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Currently Learning</label>
                <Input name="learning" value={profileData.learning} onChange={handleChange} placeholder="e.g. Rust, WebAssembly" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Email Address</label>
                <Input name="email" value={profileData.email} onChange={handleChange} placeholder="hello@example.com" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Fun Fact</label>
                <textarea 
                  name="funFact" value={profileData.funFact} onChange={handleChange} rows={2}
                  className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-500 resize-none"
                  placeholder="Tell us something interesting..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Skills</label>
                <form onSubmit={addSkill} className="flex gap-3">
                  <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g. React, Python" />
                  <Button type="submit" variant="secondary" size="icon"><Plus size={18} /></Button>
                </form>
                <div className="flex flex-wrap gap-2 pt-1">
                  {profileData.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-300">
                      {skill}
                      <button type="button" onClick={() => removeSkill(i)} className="text-slate-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Social Links</label>
                <form onSubmit={addSocial} className="flex gap-3">
                  <select 
                    value={newSocialPlatform} onChange={(e) => setNewSocialPlatform(e.target.value)}
                    className="flex h-9 rounded-md border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <option>GitHub</option>
                    <option>LinkedIn</option>
                    <option>Twitter</option>
                    <option>Portfolio</option>
                  </select>
                  <Input className="flex-1" value={newSocialUrl} onChange={(e) => setNewSocialUrl(e.target.value)} placeholder="URL..." />
                  <Button type="submit" variant="secondary" size="icon"><Plus size={18} /></Button>
                </form>
                <ul className="space-y-2 pt-1">
                  {profileData.socials.map((social, i) => (
                    <li key={i} className="group flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-zinc-300">
                      <span className="flex items-center gap-2 font-medium">
                        {social.platform}: <a href={social.url} target="_blank" rel="noopener noreferrer" className="font-normal text-blue-500 hover:underline">{social.url}</a>
                      </span>
                      <button type="button" onClick={() => removeSocial(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
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

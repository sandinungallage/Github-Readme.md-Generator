import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Input } from './common/Input'
import { Button } from './common/Button'

export default function Form({ projectData, setProjectData }) {
  const [newFeature, setNewFeature] = useState('')
  const [newTech, setNewTech] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setProjectData(prev => ({ ...prev, [name]: value }))
  }

  const addFeature = (e) => {
    e.preventDefault()
    if (!newFeature.trim()) return
    setProjectData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }))
    setNewFeature('')
  }

  const removeFeature = (index) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addTech = (e) => {
    e.preventDefault()
    if (!newTech.trim()) return
    setProjectData(prev => ({ ...prev, techStack: [...prev.techStack, newTech.trim()] }))
    setNewTech('')
  }

  const removeTech = (index) => {
    setProjectData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-zinc-100 text-lg border-b border-slate-200 dark:border-zinc-800 pb-2">
          Basic Information
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Project Title</label>
            <Input 
              name="title"
              value={projectData.title}
              onChange={handleChange}
              placeholder="e.g. SmartCampus API"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Description</label>
            <textarea 
              name="description"
              value={projectData.description}
              onChange={handleChange}
              rows={3}
              className="flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-500 resize-none"
              placeholder="A short, catchy description of your project..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">Project Type</label>
            <select 
              name="projectType"
              value={projectData.projectType}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <option value="web">Web Application</option>
              <option value="api">REST API / Backend</option>
              <option value="mobile">Mobile App</option>
              <option value="ml">Machine Learning / AI</option>
              <option value="library">Library / Package</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-zinc-100 text-lg border-b border-slate-200 dark:border-zinc-800 pb-2">
          Tech Stack
        </h3>
        
        <form onSubmit={addTech} className="flex gap-3">
          <Input 
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="e.g. React, Node.js, MongoDB"
          />
          <Button type="submit" variant="secondary" size="icon">
            <Plus size={18} />
          </Button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {projectData.techStack.map((tech, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-zinc-300">
              {tech}
              <button type="button" onClick={() => removeTech(i)} className="text-slate-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
          {projectData.techStack.length === 0 && <span className="text-sm text-slate-500">No technologies added yet.</span>}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 dark:text-zinc-100 text-lg border-b border-slate-200 dark:border-zinc-800 pb-2">
          Key Features
        </h3>
        
        <form onSubmit={addFeature} className="flex gap-3">
          <Input 
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="e.g. JWT User Authentication"
          />
          <Button type="submit" variant="secondary" size="icon">
            <Plus size={18} />
          </Button>
        </form>

        <ul className="space-y-2 pt-2">
          {projectData.features.map((feature, i) => (
            <li key={i} className="group flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-2 rounded-md text-sm text-slate-700 dark:text-zinc-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {feature}
              </span>
              <button type="button" onClick={() => removeFeature(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={16} />
              </button>
            </li>
          ))}
          {projectData.features.length === 0 && <li className="text-sm text-slate-500">No features added yet.</li>}
        </ul>
      </div>

    </div>
  )
}

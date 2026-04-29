import { useState } from 'react'
import { Plus, X } from 'lucide-react'

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
      <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
        <h3 className="font-semibold text-white text-lg flex items-center gap-2">
          <span className="text-violet-400">01.</span> Basic Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Project Title</label>
            <input 
              type="text" 
              name="title"
              value={projectData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl glass-input"
              placeholder="e.g. SmartCampus API"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Description</label>
            <textarea 
              name="description"
              value={projectData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl glass-input resize-none"
              placeholder="A short, catchy description of your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Project Type</label>
            <select 
              name="projectType"
              value={projectData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl glass-input appearance-none bg-slate-900/80 cursor-pointer"
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
      <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
        <h3 className="font-semibold text-white text-lg flex items-center gap-2">
          <span className="text-cyan-400">02.</span> Tech Stack
        </h3>
        
        <form onSubmit={addTech} className="flex gap-3">
          <input 
            type="text" 
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl glass-input"
            placeholder="e.g. React, Node.js, MongoDB"
          />
          <button type="submit" className="bg-white/10 text-white px-4 rounded-xl hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-pointer">
            <Plus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2.5">
          {projectData.techStack.map((tech, i) => (
            <div key={i} className="group flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-sm font-medium text-cyan-100 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-all">
              {tech}
              <button type="button" onClick={() => removeTech(i)} className="text-cyan-500/50 hover:text-red-400 transition-colors cursor-pointer">
                <X size={14} />
              </button>
            </div>
          ))}
          {projectData.techStack.length === 0 && <span className="text-sm text-slate-500 italic ml-1">No technologies added yet.</span>}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-inner">
        <h3 className="font-semibold text-white text-lg flex items-center gap-2">
          <span className="text-violet-400">03.</span> Key Features
        </h3>
        
        <form onSubmit={addFeature} className="flex gap-3">
          <input 
            type="text" 
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl glass-input"
            placeholder="e.g. JWT User Authentication"
          />
          <button type="submit" className="bg-white/10 text-white px-4 rounded-xl hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/50 hover:text-violet-400 transition-all cursor-pointer">
            <Plus size={20} />
          </button>
        </form>

        <ul className="space-y-2.5">
          {projectData.features.map((feature, i) => (
            <li key={i} className="group flex items-center justify-between bg-slate-900/50 border border-white/5 hover:border-violet-500/30 px-4 py-3 rounded-xl text-sm text-slate-300 transition-all">
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 group-hover:bg-violet-400 group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all"></span>
                {feature}
              </span>
              <button type="button" onClick={() => removeFeature(i)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                <X size={16} />
              </button>
            </li>
          ))}
          {projectData.features.length === 0 && <li className="text-sm text-slate-500 italic ml-1">No features added yet.</li>}
        </ul>
      </div>

    </div>
  )
}

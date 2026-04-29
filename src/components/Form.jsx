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
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <h3 className="font-medium text-slate-800 text-lg">Basic Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
          <input 
            type="text" 
            name="title"
            value={projectData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. SmartCampus API"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea 
            name="description"
            value={projectData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="A short description of your project..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
          <select 
            name="projectType"
            value={projectData.projectType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
          >
            <option value="web">Web Application</option>
            <option value="api">REST API / Backend</option>
            <option value="mobile">Mobile App</option>
            <option value="ml">Machine Learning / AI</option>
            <option value="library">Library / Package</option>
          </select>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <h3 className="font-medium text-slate-800 text-lg">Tech Stack</h3>
        
        <form onSubmit={addTech} className="flex gap-2">
          <input 
            type="text" 
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. React, Node.js, MongoDB"
          />
          <button type="submit" className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors">
            <Plus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {projectData.techStack.map((tech, i) => (
            <div key={i} className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-sm font-medium text-slate-700 shadow-sm">
              {tech}
              <button type="button" onClick={() => removeTech(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
          {projectData.techStack.length === 0 && <span className="text-sm text-slate-500 italic">No technologies added yet.</span>}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <h3 className="font-medium text-slate-800 text-lg">Key Features</h3>
        
        <form onSubmit={addFeature} className="flex gap-2">
          <input 
            type="text" 
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="e.g. User Authentication"
          />
          <button type="submit" className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors">
            <Plus size={20} />
          </button>
        </form>

        <ul className="space-y-2">
          {projectData.features.map((feature, i) => (
            <li key={i} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-700 shadow-sm">
              <span>{feature}</span>
              <button type="button" onClick={() => removeFeature(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </li>
          ))}
          {projectData.features.length === 0 && <li className="text-sm text-slate-500 italic">No features added yet.</li>}
        </ul>
      </div>

    </div>
  )
}

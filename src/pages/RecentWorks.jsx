import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Trash2, Edit, CheckCircle2, Clock, FolderGit2, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import { useToastStore } from '../store/toastStore'
import { Card, CardContent } from '../components/common/Card'
import { Button } from '../components/common/Button'

export default function RecentWorks() {
  const [activeTab, setActiveTab] = useState('draft')
  const navigate = useNavigate()
  const addToast = useToastStore((state) => state.addToast)
  
  const projects = useProjectStore((state) => state.projects)
  const deleteProject = useProjectStore((state) => state.deleteProject)
  
  const filteredProjects = projects
    .filter(p => p.status === activeTab)
    .sort((a, b) => b.updatedAt - a.updatedAt)

  const handleEdit = (project) => {
    const route = project.type === 'profile' ? '/profile-readme' : '/project-readme'
    navigate(route, { state: { project } })
  }

  const handleDelete = (id) => {
    deleteProject(id)
    addToast({ title: 'Deleted', description: 'Project has been deleted permanently.', type: 'info' })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Recent Works</h1>
        <p className="text-slate-500 dark:text-zinc-400">Manage your saved drafts and completed documentation.</p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 space-x-1 bg-slate-100 dark:bg-zinc-900/50 rounded-xl w-full max-w-md">
        <button
          onClick={() => setActiveTab('draft')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'draft'
              ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
          }`}
        >
          <Clock size={16} />
          Drafts
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'completed'
              ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
          }`}
        >
          <CheckCircle2 size={16} />
          Completed
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl"
            >
              <FileText className="mx-auto h-12 w-12 text-slate-400 dark:text-zinc-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-zinc-200 mb-1">No projects found</h3>
              <p className="text-slate-500 dark:text-zinc-400">
                {activeTab === 'draft' 
                  ? "You don't have any saved drafts yet." 
                  : "You haven't completed any READMEs yet."}
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={project.id}
              >
                <Card className="glass-panel group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                  <div className={`h-2 ${project.type === 'profile' ? 'bg-indigo-500' : 'bg-blue-500'}`} />
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300">
                        {project.type === 'profile' ? <User size={20} /> : <FolderGit2 size={20} />}
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-zinc-100 line-clamp-1 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 capitalize mb-6">
                      {project.type} Generator
                    </p>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" className="flex-1 bg-white dark:bg-zinc-900" onClick={() => handleEdit(project)}>
                        <Edit size={16} className="mr-2" /> Edit
                      </Button>
                      <Button variant="outline" className="px-3 bg-red-50 hover:bg-red-100 hover:text-red-600 dark:bg-zinc-900 dark:hover:bg-red-900/30 dark:hover:text-red-400 text-slate-400 border-transparent transition-colors" onClick={() => handleDelete(project.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Rocket, ChevronRight, FileCode2 } from 'lucide-react'
import { Card, CardContent } from '../components/common/Card'

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4 pt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6"
        >
          <FileCode2 size={32} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100"
        >
          What would you like to build?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto"
        >
          Choose a generator below to start crafting perfect markdown documentation in seconds.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6 pt-4"
      >
        <Link to="/profile-readme" className="group block focus:outline-none">
          <Card className="h-full border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-zinc-900/80">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <User size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-3">
                GitHub Profile README
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 flex-grow mb-8 leading-relaxed">
                Stand out to recruiters and peers. Generate a beautiful, personalized GitHub profile landing page featuring your skills, current work, and social links.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold mt-auto group-hover:translate-x-2 transition-transform duration-300">
                Start building <ChevronRight size={20} className="ml-1" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/project-readme" className="group block focus:outline-none">
          <Card className="h-full border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-xl bg-white dark:bg-zinc-900/80">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-3">
                Project README
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 flex-grow mb-8 leading-relaxed">
                Create comprehensive documentation for your repositories. Document your tech stack, features, installation steps, and architecture effortlessly.
              </p>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold mt-auto group-hover:translate-x-2 transition-transform duration-300">
                Start building <ChevronRight size={20} className="ml-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  )
}

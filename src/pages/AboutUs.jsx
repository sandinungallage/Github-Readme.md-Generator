import { motion } from 'framer-motion'
import { Link2, Mail, Code2, Users, Rocket, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../components/common/Card'
import { useToastStore } from '../store/toastStore'
import DeveloperImg from '../assets/Developer.jpg'

export default function AboutUs() {
  const addToast = useToastStore((state) => state.addToast)

  const team = [
    {
      name: "Sandinu Nethmika",
      role: "Lead Engineer & Founder",
      image: DeveloperImg,
      github: "https://github.com/sandinungallage",
      linkedin: "https://www.linkedin.com/in/sandinungallage",
      email: "sandinunethmika.g@gmail.com"
    }
  ]

  const stats = [
    { label: "Active Users", value: "10k+", icon: Users },
    { label: "READMEs Generated", value: "50k+", icon: FileTextIcon },
    { label: "Time Saved (hrs)", value: "25k+", icon: ClockIcon }
  ]

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email)
    addToast({ title: 'Copied!', description: 'Email address copied to clipboard.', type: 'success' })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4"
        >
          <Code2 size={32} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100"
        >
          Documentation, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Elevated.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto"
        >
          We believe that great software deserves great documentation. README Engineer was built to help developers create production-ready documentation in seconds, not hours.
        </motion.p>
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50">
          <CardContent className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Our Mission</h3>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
              To eliminate the friction of writing project documentation. We want developers to focus on writing code, while we handle presenting it beautifully to the world.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-100 dark:border-purple-800/50">
          <CardContent className="p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Our Vision</h3>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
              To become the industry standard tool for open-source and enterprise documentation generation, powering millions of repositories worldwide.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Meet the Team</h2>
          <p className="text-slate-500 dark:text-zinc-400">The people building the future of documentation.</p>
        </div>

        <div className="flex justify-center">
          {team.map((member, idx) => (
            <Card key={idx} className="overflow-hidden max-w-sm w-full text-center group bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-90 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <CardContent className="px-6 pb-8 pt-0 relative">
                <div className="relative w-28 h-28 mx-auto -mt-14 mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 animate-pulse blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative w-full h-full rounded-full border-[5px] border-white dark:border-zinc-900 bg-slate-100 dark:bg-zinc-800 overflow-hidden shadow-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">{member.role}</p>
                
                <div className="flex justify-center gap-4">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="p-3 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-all bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 rounded-full hover:scale-110 shadow-sm">
                    <Link2 size={18} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-3 text-slate-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-all bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 rounded-full hover:scale-110 shadow-sm">
                    <Link2 size={18} />
                  </a>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`} target="_blank" rel="noopener noreferrer" title="Open Gmail" className="p-3 text-slate-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-all bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 rounded-full hover:scale-110 shadow-sm focus:outline-none">
                    <Mail size={18} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

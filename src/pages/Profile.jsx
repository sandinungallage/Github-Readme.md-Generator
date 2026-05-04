import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, User as UserIcon, Mail } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'

export default function Profile() {
  const { theme, toggleTheme } = useThemeStore()
  const { user, updateProfile } = useAuthStore()
  const addToast = useToastStore((state) => state.addToast)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    updateProfile({ name, email })
    addToast({
      title: 'Profile Updated',
      description: 'Your account details have been saved successfully.',
      type: 'success',
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Profile & Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and theme settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-panel border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-medium text-lg text-slate-900 dark:text-slate-100">{user?.name || 'User'}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <UserIcon size={16} /> Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} /> Email
                </label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="mt-4" onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-panel border-0 shadow-xl h-full">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Theme Appearance</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark mode.</p>
                </div>
                <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                  {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-700" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

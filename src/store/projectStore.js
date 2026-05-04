import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      
      saveProject: (projectData) => {
        set((state) => {
          const existingIndex = state.projects.findIndex((p) => p.id === projectData.id)
          if (existingIndex >= 0) {
            const newProjects = [...state.projects]
            newProjects[existingIndex] = { ...newProjects[existingIndex], ...projectData, updatedAt: Date.now() }
            return { projects: newProjects }
          }
          return {
            projects: [
              ...state.projects,
              { ...projectData, updatedAt: Date.now() }
            ]
          }
        })
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id)
        }))
      },

      getProjectsByStatus: (status) => {
        return get().projects.filter((p) => p.status === status).sort((a, b) => b.updatedAt - a.updatedAt)
      }
    }),
    {
      name: 'project-storage',
    }
  )
)

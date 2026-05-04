import { create } from 'zustand'

export const useModalStore = create((set) => ({
  isOpen: false,
  view: null, // React node to render inside the modal
  title: '',
  openModal: ({ view, title }) => set({ isOpen: true, view, title }),
  closeModal: () => set({ isOpen: false, view: null, title: '' }),
}))

import { create } from 'zustand'

export type Experience = {
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    description: string
    isCurrent: boolean
}

export type Education = {
    id: string
    school: string
    degree: string
    year: string
}

export type CVData = {
    personal: {
        fullName: string
        email: string
        phone: string
        jobTitle: string
        linkedin: string
    }
    experiences: Experience[]
    education: Education[]
    skills: string[]
    selectedTemplate: 'minimalist' | 'bold'
}

interface CVStore {
    data: CVData
    updatePersonal: (data: Partial<CVData['personal']>) => void
    addExperience: (experience: Experience) => void
    updateExperience: (id: string, experience: Partial<Experience>) => void
    removeExperience: (id: string) => void
    addEducation: (education: Education) => void
    updateEducation: (id: string, education: Partial<Education>) => void
    removeEducation: (id: string) => void
    addSkill: (skill: string) => void
    removeSkill: (skill: string) => void
    setTemplate: (template: 'minimalist' | 'bold') => void
    setFullData: (data: CVData) => void
}

export const useCVStore = create<CVStore>((set) => ({
    data: {
        personal: {
            fullName: '',
            email: '',
            phone: '',
            jobTitle: '',
            linkedin: '',
        },
        experiences: [],
        education: [],
        skills: [],
        selectedTemplate: 'minimalist',
    },
    updatePersonal: (personal) =>
        set((state) => ({
            data: { ...state.data, personal: { ...state.data.personal, ...personal } },
        })),
    addExperience: (experience) =>
        set((state) => ({
            data: {
                ...state.data,
                experiences: [...state.data.experiences, experience],
            },
        })),
    updateExperience: (id, experience) =>
        set((state) => ({
            data: {
                ...state.data,
                experiences: state.data.experiences.map((exp) =>
                    exp.id === id ? { ...exp, ...experience } : exp
                ),
            },
        })),
    removeExperience: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                experiences: state.data.experiences.filter((exp) => exp.id !== id),
            },
        })),
    addEducation: (education) =>
        set((state) => ({
            data: {
                ...state.data,
                education: [...state.data.education, education],
            },
        })),
    updateEducation: (id, education) =>
        set((state) => ({
            data: {
                ...state.data,
                education: state.data.education.map((edu) =>
                    edu.id === id ? { ...edu, ...education } : edu
                ),
            },
        })),
    removeEducation: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                education: state.data.education.filter((edu) => edu.id !== id),
            },
        })),
    addSkill: (skill) =>
        set((state) => ({
            data: {
                ...state.data,
                skills: [...state.data.skills, skill],
            },
        })),
    removeSkill: (skill) =>
        set((state) => ({
            data: {
                ...state.data,
                skills: state.data.skills.filter((s) => s !== skill),
            },
        })),
    setTemplate: (template) =>
        set((state) => ({
            data: { ...state.data, selectedTemplate: template },
        })),
    setFullData: (data) => set({ data }),
}))

'use client'

import { useCVStore } from '@/lib/store/cv-store'
import { cn } from '@/lib/utils'

export function CVPreview() {
    const { data } = useCVStore()
    const { personal, experiences, education, selectedTemplate } = data

    if (selectedTemplate === 'bold') {
        return (
            <div className="min-h-[297mm] w-[210mm] bg-white p-0 shadow-lg text-gray-900">
                {/* Bold Template */}
                <div className="bg-slate-900 text-white p-10">
                    <h1 className="text-4xl font-bold uppercase tracking-wider">{personal.fullName}</h1>
                    <p className="text-xl mt-2 text-slate-300">{personal.jobTitle}</p>
                </div>
                <div className="grid grid-cols-3 h-full">
                    <div className="col-span-1 bg-slate-100 p-8 space-y-8 border-r">
                        <div>
                            <h3 className="font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Contact</h3>
                            <div className="space-y-2 text-sm">
                                <p>{personal.email}</p>
                                <p>{personal.phone}</p>
                                <p>{personal.linkedin}</p>
                            </div>
                        </div>
                        {/* Skills would go here */}
                    </div>
                    <div className="col-span-2 p-8 space-y-8">
                        {experiences.length > 0 && (
                            <div>
                                <h3 className="font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Experience</h3>
                                <div className="space-y-6">
                                    {experiences.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="font-bold text-lg">{exp.role}</h4>
                                                <span className="text-sm text-gray-600">
                                                    {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="font-medium text-slate-700">{exp.company}</p>
                                            <p className="mt-2 text-sm whitespace-pre-wrap">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Minimalist Template (Default)
    return (
        <div className="min-h-[297mm] w-[210mm] bg-white p-12 shadow-lg text-gray-900">
            <header className="border-b-2 border-gray-900 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight">{personal.fullName}</h1>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-xl font-light">{personal.jobTitle}</p>
                    <div className="text-right text-sm space-y-1">
                        <p>{personal.email}</p>
                        <p>{personal.phone}</p>
                        <p>{personal.linkedin}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                {experiences.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Experience</h3>
                        <div className="space-y-6">
                            {experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-lg">{exp.company}</h4>
                                        <span className="text-sm font-medium">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="italic mb-2">{exp.role}</p>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

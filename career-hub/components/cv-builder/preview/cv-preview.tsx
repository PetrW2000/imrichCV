'use client'

import { useCVStore } from '@/lib/store/cv-store'
import { cn } from '@/lib/utils'

export function CVPreview() {
    const { data } = useCVStore()
    const { personal, experiences, education, skills, selectedTemplate } = data

    if (selectedTemplate === 'creative') {
        return (
            <div className="min-h-[297mm] w-[210mm] bg-white p-0 shadow-lg text-gray-900 flex">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-slate-800 text-white p-8 min-h-full">
                    <div className="flex flex-col items-center text-center mb-8">
                        {personal.photo && (
                            <img
                                src={personal.photo}
                                alt={personal.fullName}
                                className="w-32 h-32 rounded-full object-cover border-4 border-slate-600 mb-4"
                            />
                        )}
                        <h1 className="text-2xl font-bold uppercase tracking-wider">{personal.fullName}</h1>
                        <p className="text-slate-400 mt-2">{personal.jobTitle}</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-600 pb-2">Contact</h3>
                            <div className="space-y-3 text-sm text-slate-300">
                                <p>{personal.email}</p>
                                <p>{personal.phone}</p>
                                <p>{personal.linkedin}</p>
                            </div>
                        </div>

                        {skills.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-600 pb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span key={skill} className="bg-slate-700 px-2 py-1 text-xs rounded text-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {education.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-600 pb-2">Education</h3>
                                <div className="space-y-4 text-sm text-slate-300">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <p className="font-bold text-white">{edu.school}</p>
                                            <p>{edu.degree}</p>
                                            <p className="text-xs text-slate-500">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-2/3 p-10 bg-white">
                    {experiences.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-slate-800 mb-6 border-b-2 border-slate-800 pb-2">Experience</h3>
                            <div className="space-y-8">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="relative border-l-2 border-slate-200 pl-6 pb-2">
                                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-800" />
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-lg text-slate-800">{exp.role}</h4>
                                            <span className="text-sm font-medium text-slate-500">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 font-medium mb-2">{exp.company}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        )
    }

    if (selectedTemplate === 'professional') {
        return (
            <div className="min-h-[297mm] w-[210mm] bg-white p-16 shadow-lg text-gray-900 font-serif">
                <header className="text-center border-b-2 border-gray-900 pb-8 mb-8">
                    <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{personal.fullName}</h1>
                    <p className="text-xl italic text-gray-600 mb-4">{personal.jobTitle}</p>

                    <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                        <span>{personal.email}</span>
                        <span>•</span>
                        <span>{personal.phone}</span>
                        <span>•</span>
                        <span>{personal.linkedin}</span>
                    </div>
                </header>

                <div className="space-y-8">
                    {personal.photo && (
                        <div className="flex justify-center mb-8">
                            <img
                                src={personal.photo}
                                alt={personal.fullName}
                                className="w-32 h-32 rounded-full object-cover border border-gray-300"
                            />
                        </div>
                    )}

                    {experiences.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 text-center">Professional Experience</h3>
                            <div className="space-y-6">
                                {experiences.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-lg">{exp.company}</h4>
                                            <span className="text-sm italic">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <p className="italic mb-2 font-medium">{exp.role}</p>
                                        <p className="text-sm leading-relaxed text-justify whitespace-pre-wrap">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 text-center">Education</h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="flex justify-between items-baseline">
                                        <div>
                                            <h4 className="font-bold">{edu.school}</h4>
                                            <p className="italic text-sm">{edu.degree}</p>
                                        </div>
                                        <span className="text-sm">{edu.year}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 text-center">Skills</h3>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {skills.map((skill) => (
                                    <span key={skill} className="text-sm">
                                        • {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        )
    }

    if (selectedTemplate === 'bold') {
        return (
            <div className="min-h-[297mm] w-[210mm] bg-white p-0 shadow-lg text-gray-900">
                {/* Bold Template */}
                <div className="bg-slate-900 text-white p-10 flex items-center gap-8">
                    {personal.photo && (
                        <img
                            src={personal.photo}
                            alt={personal.fullName}
                            className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                        />
                    )}
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wider">{personal.fullName}</h1>
                        <p className="text-xl mt-2 text-slate-300">{personal.jobTitle}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 h-full">
                    <div className="col-span-1 bg-slate-100 p-8 space-y-8 border-r min-h-[250mm]">
                        <div>
                            <h3 className="font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Contact</h3>
                            <div className="space-y-2 text-sm">
                                <p>{personal.email}</p>
                                <p>{personal.phone}</p>
                                <p>{personal.linkedin}</p>
                            </div>
                        </div>

                        {education.length > 0 && (
                            <div>
                                <h3 className="font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Education</h3>
                                <div className="space-y-4">
                                    {education.map((edu) => (
                                        <div key={edu.id}>
                                            <p className="font-bold">{edu.school}</p>
                                            <p className="text-sm">{edu.degree}</p>
                                            <p className="text-sm text-gray-600">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div>
                                <h3 className="font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-2 mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span key={skill} className="bg-slate-200 px-2 py-1 text-xs font-medium rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
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
            <header className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-tight">{personal.fullName}</h1>
                    <p className="text-xl font-light mt-2">{personal.jobTitle}</p>
                </div>
                {personal.photo ? (
                    <img
                        src={personal.photo}
                        alt={personal.fullName}
                        className="w-24 h-24 object-cover border border-gray-200"
                    />
                ) : (
                    <div className="text-right text-sm space-y-1">
                        <p>{personal.email}</p>
                        <p>{personal.phone}</p>
                        <p>{personal.linkedin}</p>
                    </div>
                )}
            </header>

            {/* Contact info moved below header if photo exists */}
            {personal.photo && (
                <div className="flex gap-6 text-sm mb-8 text-gray-600">
                    <p>{personal.email}</p>
                    <p>{personal.phone}</p>
                    <p>{personal.linkedin}</p>
                </div>
            )}

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

                {education.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Education</h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="flex justify-between">
                                    <div>
                                        <h4 className="font-bold">{edu.school}</h4>
                                        <p className="text-sm">{edu.degree}</p>
                                    </div>
                                    <span className="text-sm font-medium">{edu.year}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill} className="border border-gray-300 px-3 py-1 text-sm rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

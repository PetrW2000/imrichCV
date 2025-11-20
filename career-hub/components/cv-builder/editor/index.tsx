'use client'

import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { TemplateSelector } from '../template-selector'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { PersonalForm } from './forms/personal-form'
import { ExperienceForm } from './forms/experience-form'
import { EducationForm } from './forms/education-form'
import { SkillsForm } from './forms/skills-form'
import { CVPreview } from '../preview/cv-preview'
import { downloadPdf } from '@/app/builder/actions'
import { toast } from 'sonner'

interface CVEditorProps {
    initialCredits: number
}

export function CVEditor({ initialCredits }: CVEditorProps) {
    const [activeTab, setActiveTab] = useState('personal')
    const [credits, setCredits] = useState(initialCredits)
    const [isDownloading, setIsDownloading] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'My Resume',
    })

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            const { success, error } = await downloadPdf()
            if (error) {
                toast.error(error)
                return
            }

            setCredits(prev => prev - 50)
            toast.success('Downloading PDF... (50 credits deducted)')
            handlePrint && handlePrint()
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="border-b bg-white px-6 py-3 dark:bg-gray-950 dark:border-gray-800 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">CV Builder</h1>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        Credits: {credits}
                    </span>
                </div>
                <div>
                    <Button onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="mr-2 h-4 w-4" />
                        )}
                        Download PDF (50 Credits)
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                {/* Left Panel - Inputs */}
                <div className="w-full border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:w-1/2 lg:min-w-[500px]">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            <div className="mb-8">
                                <h2 className="mb-4 text-lg font-semibold">Choose Template</h2>
                                <TemplateSelector />
                            </div>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="personal">Personal</TabsTrigger>
                                    <TabsTrigger value="experience">Experience</TabsTrigger>
                                    <TabsTrigger value="education">Education</TabsTrigger>
                                    <TabsTrigger value="skills">Skills</TabsTrigger>
                                </TabsList>

                                <div className="mt-6">
                                    <TabsContent value="personal">
                                        <PersonalForm />
                                    </TabsContent>
                                    <TabsContent value="experience">
                                        <ExperienceForm />
                                    </TabsContent>
                                    <TabsContent value="education">
                                        <EducationForm />
                                    </TabsContent>
                                    <TabsContent value="skills">
                                        <SkillsForm />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Panel - Preview */}
                <div className="hidden w-full bg-gray-100 p-8 dark:bg-gray-900 lg:block lg:w-1/2 overflow-hidden">
                    <div className="h-full flex flex-col">
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-700 dark:text-gray-300">Live Preview</h2>
                        </div>
                        <div className="flex-1 flex justify-center overflow-hidden">
                            <div className="h-full w-full max-w-[210mm] overflow-y-auto shadow-2xl">
                                <div ref={componentRef}>
                                    <CVPreview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

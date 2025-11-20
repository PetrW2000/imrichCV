'use client'

import { useState } from 'react'
import { TemplateSelector } from '../template-selector'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PersonalForm } from './forms/personal-form'
import { ExperienceForm } from './forms/experience-form'
import { CVPreview } from '../preview/cv-preview'

export function CVEditor() {
    const [activeTab, setActiveTab] = useState('personal')

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
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
                                    <div className="text-center text-gray-500">Coming Soon</div>
                                </TabsContent>
                                <TabsContent value="skills">
                                    <div className="text-center text-gray-500">Coming Soon</div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </ScrollArea>
            </div>

            {/* Right Panel - Preview */}
            <div className="hidden w-full bg-gray-100 p-8 dark:bg-gray-900 lg:block lg:w-1/2">
                <div className="h-full flex flex-col">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="font-semibold text-gray-700 dark:text-gray-300">Live Preview</h2>
                    </div>
                    <div className="flex-1 flex justify-center overflow-hidden">
                        <div className="h-full w-full max-w-[210mm] overflow-y-auto shadow-2xl">
                            <CVPreview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

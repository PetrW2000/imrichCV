'use client'

import { useCVStore } from '@/lib/store/cv-store'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'

const templates = [
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Clean, simple, and professional.',
        // In a real app, these would be actual screenshots
        color: 'bg-slate-100',
    },
    {
        id: 'bold',
        name: 'Bold',
        description: 'Stand out with strong typography and accents.',
        color: 'bg-blue-100',
    },
] as const

export function TemplateSelector() {
    const { data, setTemplate } = useCVStore()

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {templates.map((template) => (
                <div
                    key={template.id}
                    className={cn(
                        'relative cursor-pointer overflow-hidden rounded-lg border-2 p-4 transition-all hover:border-indigo-500',
                        data.selectedTemplate === template.id
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20'
                            : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900'
                    )}
                    onClick={() => setTemplate(template.id)}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                {template.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {template.description}
                            </p>
                        </div>
                        {data.selectedTemplate === template.id && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                                <Check className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                    <div className={cn("mt-4 h-32 w-full rounded-md border border-gray-200 dark:border-gray-700", template.color)} />
                </div>
            ))}
        </div>
    )
}

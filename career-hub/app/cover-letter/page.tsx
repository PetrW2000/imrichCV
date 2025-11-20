'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { generateCoverLetter } from './actions'
import { toast } from 'sonner'
import { Loader2, Wand2, Copy } from 'lucide-react'

export default function CoverLetterPage() {
    const [jobDescription, setJobDescription] = useState('')
    const [generatedLetter, setGeneratedLetter] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleGenerate = async () => {
        if (!jobDescription.trim()) {
            toast.error('Please enter a job description')
            return
        }

        setIsLoading(true)
        try {
            const { result, error } = await generateCoverLetter(jobDescription)
            if (error) {
                toast.error(error)
            } else if (result) {
                setGeneratedLetter(result)
                toast.success('Cover Letter generated! (10 credits deducted)')
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLetter)
        toast.success('Copied to clipboard')
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">AI Cover Letter Generator</h1>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="jd">Job Description</Label>
                        <Textarea
                            id="jd"
                            placeholder="Paste the job description here..."
                            className="h-[400px] resize-none"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading || !jobDescription.trim()}
                        className="w-full"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        Generate Letter (10 Credits)
                    </Button>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label>Generated Letter</Label>
                        {generatedLetter && (
                            <Button variant="ghost" size="sm" onClick={handleCopy}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                        )}
                    </div>
                    <Textarea
                        placeholder="Your cover letter will appear here..."
                        className="h-[400px] resize-none bg-gray-50 dark:bg-gray-900"
                        value={generatedLetter}
                        onChange={(e) => setGeneratedLetter(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

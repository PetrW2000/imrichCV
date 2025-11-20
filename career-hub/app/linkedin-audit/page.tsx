'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { auditLinkedInProfile } from './actions'
import { toast } from 'sonner'
import { Loader2, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface AuditResult {
    score: number
    summary: string
    recommendations: string[]
}

export default function LinkedInAuditPage() {
    const [url, setUrl] = useState('')
    const [profileText, setProfileText] = useState('')
    const [result, setResult] = useState<AuditResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleAudit = async () => {
        if (!url.trim() || !profileText.trim()) {
            toast.error('Please provide both URL and profile content')
            return
        }

        setIsLoading(true)
        try {
            const { result, error } = await auditLinkedInProfile(url, profileText)
            if (error) {
                toast.error(error)
            } else if (result) {
                setResult(result)
                toast.success('Audit complete!')
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">LinkedIn Profile Audit</h1>
            <p className="text-gray-500 mb-8">Get AI-powered insights to improve your professional presence. (Free)</p>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="url">LinkedIn URL</Label>
                        <Input
                            id="url"
                            placeholder="https://linkedin.com/in/yourname"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Profile Content</Label>
                        <p className="text-xs text-gray-500">
                            Paste your "About" section and key experiences here for analysis.
                        </p>
                        <Textarea
                            id="content"
                            placeholder="Paste your profile text here..."
                            className="h-[300px] resize-none"
                            value={profileText}
                            onChange={(e) => setProfileText(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleAudit}
                        disabled={isLoading || !url.trim() || !profileText.trim()}
                        className="w-full"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="mr-2 h-4 w-4" />
                        )}
                        Audit Profile
                    </Button>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl font-bold text-indigo-600">
                                            {result.score}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Progress value={result.score} className="h-3" />
                                            <p className="text-sm text-gray-500">
                                                {result.score >= 80 ? 'Excellent!' : result.score >= 60 ? 'Good start' : 'Needs work'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {result.summary}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recommendations</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {result.recommendations.map((rec, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm">{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-gray-50 dark:bg-gray-900/50">
                            <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">No Audit Results Yet</h3>
                            <p className="text-sm text-gray-500 max-w-xs mt-2">
                                Fill in your details and click "Audit Profile" to see your personalized report.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

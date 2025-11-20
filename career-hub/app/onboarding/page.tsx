'use client'

import { useActionState } from 'react'
import { submitOnboarding } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

const initialState = {
    error: '',
    errors: {},
}

export default function OnboardingPage() {
    const [state, formAction, isPending] = useActionState(submitOnboarding, initialState)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-lg space-y-8 rounded-xl border bg-white p-10 shadow-lg dark:bg-gray-950">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        Complete your profile
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        We need a few more details to set up your career hub.
                    </p>
                </div>

                <form action={formAction} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="mt-1"
                            />
                            {state?.errors?.full_name && (
                                <p className="mt-1 text-sm text-red-500">{state.errors.full_name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="job_title">Current Job Title</Label>
                            <Input
                                id="job_title"
                                name="job_title"
                                type="text"
                                required
                                placeholder="Software Engineer"
                                className="mt-1"
                            />
                            {state?.errors?.job_title && (
                                <p className="mt-1 text-sm text-red-500">{state.errors.job_title}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="+1 234 567 890"
                                className="mt-1"
                            />
                            {state?.errors?.phone && (
                                <p className="mt-1 text-sm text-red-500">{state.errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="linkedin_url">LinkedIn URL (Optional)</Label>
                            <Input
                                id="linkedin_url"
                                name="linkedin_url"
                                type="url"
                                placeholder="https://linkedin.com/in/johndoe"
                                className="mt-1"
                            />
                            {state?.errors?.linkedin_url && (
                                <p className="mt-1 text-sm text-red-500">
                                    {state.errors.linkedin_url}
                                </p>
                            )}
                        </div>
                    </div>

                    {state?.error && (
                        <p className="text-center text-sm text-red-500">{state.error}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Setup
                    </Button>
                </form>
            </div>
        </div>
    )
}

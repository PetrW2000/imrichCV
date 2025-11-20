import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CVEditor } from '@/components/cv-builder/editor'

export default async function BuilderPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile?.is_onboarding_complete) {
        redirect('/onboarding')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="border-b bg-white px-6 py-3 dark:bg-gray-950 dark:border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">CV Builder</h1>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                        Credits: {profile.credits}
                    </span>
                </div>
                <div>
                    {/* Export button will go here */}
                </div>
            </header>
            <main>
                <CVEditor />
            </main>
        </div>
    )
}

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
            <main>
                <CVEditor
                    initialCredits={profile.credits}
                    userProfile={{
                        full_name: profile.full_name,
                        email: profile.email,
                    }}
                />
            </main>
        </div>
    )
}
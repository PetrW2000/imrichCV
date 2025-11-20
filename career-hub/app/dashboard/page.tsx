import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
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
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome back, {profile.full_name}</p>
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                <p>Credits: {profile.credits}</p>
            </div>
        </div>
    )
}

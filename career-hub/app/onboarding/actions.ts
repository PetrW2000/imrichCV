'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const onboardingSchema = z.object({
    full_name: z.string().min(2, 'Full name must be at least 2 characters'),
    job_title: z.string().min(2, 'Job title must be at least 2 characters'),
    phone: z.string().min(5, 'Phone number must be at least 5 characters'),
    linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export async function submitOnboarding(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const rawData = {
        full_name: formData.get('full_name'),
        job_title: formData.get('job_title'),
        phone: formData.get('phone'),
        linkedin_url: formData.get('linkedin_url'),
    }

    const validatedFields = onboardingSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            ...validatedFields.data,
            is_onboarding_complete: true,
        })
        .eq('id', user.id)

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
}

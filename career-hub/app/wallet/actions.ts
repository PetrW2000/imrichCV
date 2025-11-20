'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function topUpCredits(amount: number) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Get current credits
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return { error: 'Profile not found' }
    }

    // 2. Update credits
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: profile.credits + amount })
        .eq('id', user.id)

    if (updateError) return { error: 'Transaction failed' }

    // 3. Log transaction
    await supabase.from('transactions').insert({
        user_id: user.id,
        amount: amount,
        type: 'deposit',
        description: `Top Up: ${amount} Credits`
    })

    revalidatePath('/dashboard')
    revalidatePath('/builder') // Update credits in builder header
    return { success: true }
}

export async function getTransactions() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        console.error('Error fetching transactions:', error)
        return { error: 'Failed to fetch transactions' }
    }

    return { transactions }
}

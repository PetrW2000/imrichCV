'use server'

import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function aiEnhanceDescription(text: string) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Check Credits
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

    if (!profile || profile.credits < 2) {
        return { error: 'Insufficient credits' }
    }

    // 2. Deduct Credits
    const { error: transactionError } = await supabase.rpc('deduct_credits', {
        user_id_arg: user.id,
        amount_arg: 2,
        description_arg: 'AI Text Enhancement',
    })

    // Note: We haven't created the RPC function yet, so we'll do a manual update for now
    // Ideally, this should be an RPC to ensure atomicity.
    // For MVP, we will do a simple update and insert.

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: profile.credits - 2 })
        .eq('id', user.id)

    if (updateError) return { error: 'Transaction failed' }

    await supabase.from('transactions').insert({
        user_id: user.id,
        amount: -2,
        type: 'usage',
        description: 'AI Text Enhancement'
    })

    // 3. Call OpenAI
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content:
                        "You are an expert resume writer. Rewrite the following job description to be action-oriented, result-driven, and professional. Use strong verbs. Keep it concise. Return ONLY the rewritten text.",
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
        })

        return { result: response.choices[0].message.content }
    } catch (error) {
        console.error('OpenAI Error:', error)
        return { error: 'AI generation failed' }
    }
}

export async function downloadPdf() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Check Credits
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single()

    if (!profile || profile.credits < 50) {
        return { error: 'Insufficient credits (50 required)' }
    }

    // 2. Deduct Credits
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: profile.credits - 50 })
        .eq('id', user.id)

    if (updateError) return { error: 'Transaction failed' }

    await supabase.from('transactions').insert({
        user_id: user.id,
        amount: -50,
        type: 'usage',
        description: 'PDF Download'
    })

    return { success: true }
}

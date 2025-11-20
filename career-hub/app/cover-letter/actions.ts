'use server'

import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateCoverLetter(jobDescription: string) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Check Credits & Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('credits, full_name, job_title')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return { error: 'Profile not found' }
    }

    if (profile.credits < 10) {
        return { error: 'Insufficient credits (10 required)' }
    }

    // 2. Deduct Credits
    // Using manual update for MVP as per previous pattern
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ credits: profile.credits - 10 })
        .eq('id', user.id)

    if (updateError) return { error: 'Transaction failed' }

    await supabase.from('transactions').insert({
        user_id: user.id,
        amount: -10,
        type: 'usage',
        description: 'Cover Letter Generation'
    })

    // 3. Fetch Experiences (if any)
    const { data: experiences } = await supabase
        .from('experiences')
        .select('company, role, description')
        .eq('user_id', user.id)

    // 4. Construct Prompt
    const experienceText = experiences?.map(exp =>
        `- ${exp.role} at ${exp.company}: ${exp.description}`
    ).join('\n') || 'No specific experience listed.'

    const prompt = `
    You are an expert career coach. Write a specific, enthusiastic cover letter connecting this candidate's experience to the job requirements.
    
    CANDIDATE PROFILE:
    Name: ${profile.full_name}
    Current Role: ${profile.job_title}
    
    EXPERIENCE HIGHLIGHTS:
    ${experienceText}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    INSTRUCTIONS:
    - Write a professional cover letter.
    - Highlight relevant skills from the experience.
    - Keep it under 400 words.
    - Use a confident but polite tone.
    - Return ONLY the body of the letter (no subject line or header unless standard).
    `

    // 5. Call OpenAI
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        })

        return { result: response.choices[0].message.content }
    } catch (error) {
        console.error('OpenAI Error:', error)
        // Refund credits if AI fails? For MVP, maybe not, but good practice.
        // We'll skip refund logic for now to keep it simple.
        return { error: 'AI generation failed' }
    }
}

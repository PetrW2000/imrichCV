'use server'

import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function auditLinkedInProfile(url: string, profileText: string) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // This is a free feature, so no credit deduction.

    const prompt = `
    You are a LinkedIn expert. Audit this profile content for career advancement.
    
    Profile URL: ${url}
    
    Profile Content:
    ${profileText}
    
    Provide a score out of 100 and 3-5 actionable recommendations to improve visibility and engagement.
    
    Return the result as a JSON object with the following structure:
    {
        "score": number,
        "summary": "Brief summary of the profile strength",
        "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
    }
    `

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: "json_object" }
        })

        const content = response.choices[0].message.content
        if (!content) return { error: 'No response from AI' }

        const result = JSON.parse(content)
        return { result }
    } catch (error) {
        console.error('OpenAI Error:', error)
        return { error: 'AI audit failed' }
    }
}

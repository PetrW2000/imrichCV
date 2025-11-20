'use client'

import { useState } from 'react'
import { useCVStore } from '@/lib/store/cv-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Plus } from 'lucide-react'

export function SkillsForm() {
    const { data, addSkill, removeSkill } = useCVStore()
    const { skills } = data
    const [newSkill, setNewSkill] = useState('')

    const handleAdd = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (newSkill.trim()) {
            if (!skills.includes(newSkill.trim())) {
                addSkill(newSkill.trim())
            }
            setNewSkill('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Add Skills</Label>
                <div className="flex gap-2">
                    <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. React, TypeScript, Project Management"
                    />
                    <Button onClick={handleAdd} size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                        {skill}
                        <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-red-500 focus:outline-none"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
                {skills.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No skills added yet.</p>
                )}
            </div>
        </div>
    )
}

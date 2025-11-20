'use client'

import { useState } from 'react'
import { useCVStore, Experience } from '@/lib/store/cv-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Trash2, Wand2, Loader2 } from 'lucide-react'
import { aiEnhanceDescription } from '@/app/builder/actions'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

export function ExperienceForm() {
    const { data, addExperience, updateExperience, removeExperience } = useCVStore()
    const { experiences } = data
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleAdd = () => {
        addExperience({
            id: uuidv4(),
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            description: '',
            isCurrent: false,
        })
    }

    const handleEnhance = async (id: string, text: string) => {
        if (!text) return
        setLoadingId(id)
        try {
            const { result, error } = await aiEnhanceDescription(text)
            if (error) {
                toast.error(error)
            } else if (result) {
                updateExperience(id, { description: result })
                toast.success('Text enhanced! (2 credits deducted)')
            }
        } catch (e) {
            toast.error('Something went wrong')
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="space-y-6">
            {experiences.map((exp) => (
                <div key={exp.id} className="rounded-lg border p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium">Experience #{experiences.indexOf(exp) + 1}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                                placeholder="Product Manager"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                disabled={exp.isCurrent}
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`current-${exp.id}`}
                            checked={exp.isCurrent}
                            onCheckedChange={(checked) =>
                                updateExperience(exp.id, { isCurrent: checked as boolean })
                            }
                        />
                        <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Description</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEnhance(exp.id, exp.description)}
                                disabled={!exp.description || loadingId === exp.id}
                                className="h-8 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                            >
                                {loadingId === exp.id ? (
                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                ) : (
                                    <Wand2 className="mr-2 h-3 w-3" />
                                )}
                                AI Enhance (2 Credits)
                            </Button>
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            placeholder="Describe your responsibilities and achievements..."
                            className="h-32"
                        />
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
            </Button>
        </div>
    )
}

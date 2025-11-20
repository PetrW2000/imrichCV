'use client'

import { useCVStore } from '@/lib/store/cv-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export function EducationForm() {
    const { data, addEducation, updateEducation, removeEducation } = useCVStore()
    const { education } = data

    const handleAdd = () => {
        addEducation({
            id: uuidv4(),
            school: '',
            degree: '',
            year: '',
        })
    }

    return (
        <div className="space-y-6">
            {education.map((edu, index) => (
                <div key={edu.id} className="rounded-lg border p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium">Education #{index + 1}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>School / University</Label>
                        <Input
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                            placeholder="Harvard University"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Year</Label>
                            <Input
                                value={edu.year}
                                onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                                placeholder="2020 - 2024"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                <Plus className="mr-2 h-4 w-4" />
                Add Education
            </Button>
        </div>
    )
}

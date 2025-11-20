'use client'

import { useCVStore } from '@/lib/store/cv-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PersonalForm() {
    const { data, updatePersonal } = useCVStore()
    const { personal } = data

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={personal.fullName}
                        onChange={(e) => updatePersonal({ fullName: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                        id="jobTitle"
                        value={personal.jobTitle}
                        onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
                        placeholder="Software Engineer"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={personal.email}
                    onChange={(e) => updatePersonal({ email: e.target.value })}
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={personal.phone}
                    onChange={(e) => updatePersonal({ phone: e.target.value })}
                    placeholder="+1 234 567 890"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                    id="linkedin"
                    value={personal.linkedin}
                    onChange={(e) => updatePersonal({ linkedin: e.target.value })}
                    placeholder="linkedin.com/in/johndoe"
                />
            </div>
        </div>
    )
}

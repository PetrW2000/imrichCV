'use client'

import { useEffect } from 'react'
import { useCVStore } from '@/lib/store/cv-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'

export function PersonalForm({ userProfile }: { userProfile: { full_name: string, email: string } }) {
    const { t } = useLanguage()
    const { data, updatePersonal } = useCVStore()
    const { personal } = data

    useEffect(() => {
        if (userProfile) {
            updatePersonal({ fullName: userProfile.full_name })
            updatePersonal({ email: userProfile.email })
        }
    }, [userProfile, updatePersonal])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                updatePersonal({ photo: reader.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                        {t.builder.personal.fullName}
                        <Lock className="h-3 w-3 text-gray-400" />
                    </Label>
                    <Input
                        id="fullName"
                        value={personal.fullName}
                        disabled
                        className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                        {t.builder.personal.email}
                        <Lock className="h-3 w-3 text-gray-400" />
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={personal.email}
                        disabled
                        className="bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">{t.builder.personal.jobTitle}</Label>
                    <Input
                        id="jobTitle"
                        value={personal.jobTitle}
                        onChange={(e) => updatePersonal({ jobTitle: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">{t.builder.personal.phone}</Label>
                    <Input
                        id="phone"
                        value={personal.phone}
                        onChange={(e) => updatePersonal({ phone: e.target.value })}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="linkedin">{t.builder.personal.linkedin}</Label>
                    <Input
                        id="linkedin"
                        value={personal.linkedin}
                        onChange={(e) => updatePersonal({ linkedin: e.target.value })}
                        placeholder="linkedin.com/in/username"
                    />
                </div>
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="photo">{t.builder.personal.photo}</Label>
                    <div className="flex items-center gap-4">
                        {personal.photo && (
                            <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                                <img src={personal.photo} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="w-full"
                        />
                        {personal.photo && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updatePersonal({ photo: '' })}
                                className="text-red-500 hover:text-red-600"
                            >
                                {t.builder.personal.removePhoto}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

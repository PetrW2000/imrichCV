'use client'

import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage()

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    'px-2 min-w-[32px]',
                    locale === 'en' ? 'bg-gray-100 dark:bg-gray-800 font-bold' : 'opacity-50'
                )}
                onClick={() => setLocale('en')}
            >
                🇬🇧
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    'px-2 min-w-[32px]',
                    locale === 'cs' ? 'bg-gray-100 dark:bg-gray-800 font-bold' : 'opacity-50'
                )}
                onClick={() => setLocale('cs')}
            >
                🇨🇿
            </Button>
        </div>
    )
}

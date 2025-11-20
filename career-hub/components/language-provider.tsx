'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { dictionaries, Locale } from '@/lib/i18n/dictionaries'

type LanguageContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: typeof dictionaries['en']
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en')

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'cs')) {
            setLocale(savedLocale)
        }
    }, [])

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale)
        localStorage.setItem('locale', newLocale)
    }

    return (
        <LanguageContext.Provider
            value={{
                locale,
                setLocale: handleSetLocale,
                t: dictionaries[locale],
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

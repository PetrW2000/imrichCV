'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { topUpCredits } from '@/app/wallet/actions'
import { toast } from 'sonner'
import { Loader2, CreditCard } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'

export function TopUpModal() {
    const { t } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleTopUp = async (amount: number) => {
        setIsLoading(true)
        try {
            const { success, error } = await topUpCredits(amount)
            if (error) {
                toast.error(error)
            } else if (success) {
                toast.success(`Successfully added ${amount} credits!`)
                setIsOpen(false)
            }
        } catch (e) {
            toast.error(t.common.error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t.dashboard.topUp}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t.wallet.topUpTitle}</DialogTitle>
                    <DialogDescription>
                        {t.wallet.topUpDesc}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button
                        variant="outline"
                        className="h-20 justify-between px-6"
                        onClick={() => handleTopUp(100)}
                        disabled={isLoading}
                    >
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-lg">{t.wallet.buy100}</span>
                        </div>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-20 justify-between px-6 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:border-indigo-800 dark:hover:bg-indigo-900"
                        onClick={() => handleTopUp(500)}
                        disabled={isLoading}
                    >
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-lg">{t.wallet.buy500}</span>
                        </div>
                    </Button>
                </div>
                <DialogFooter>
                    {isLoading && (
                        <div className="flex items-center text-sm text-gray-500">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t.common.loading}
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

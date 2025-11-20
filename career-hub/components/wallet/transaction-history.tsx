'use client'

import { useEffect, useState } from 'react'
import { getTransactions } from '@/app/wallet/actions'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

interface Transaction {
    id: string
    amount: number
    type: string
    description: string
    created_at: string
}

export function TransactionHistory({ initialTransactions = [] }: { initialTransactions?: Transaction[] }) {
    const { t } = useLanguage()
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
    const [isLoading, setIsLoading] = useState(initialTransactions.length === 0)

    useEffect(() => {
        if (initialTransactions.length > 0) {
            setIsLoading(false)
            return
        }

        const fetchTransactions = async () => {
            const { transactions, error } = await getTransactions()
            if (transactions) {
                setTransactions(transactions)
            }
            setIsLoading(false)
        }
        fetchTransactions()
    }, [initialTransactions])

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t.wallet.history}</CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">{t.dashboard.noTransactions}</p>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {tx.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{tx.description}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(tx.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <span className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

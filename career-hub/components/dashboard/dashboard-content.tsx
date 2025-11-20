'use client'

import { useLanguage } from '@/components/language-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, Search, LogOut } from 'lucide-react'
import Link from 'next/link'
import { TopUpModal } from '@/components/wallet/top-up-modal'
import { TransactionHistory } from '@/components/wallet/transaction-history'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface DashboardContentProps {
    profile: any
    transactions: any[]
}

export function DashboardContent({ profile, transactions }: DashboardContentProps) {
    const { t } = useLanguage()
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <header className="bg-white shadow-sm dark:bg-gray-900">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Career Hub</h1>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Button variant="ghost" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            {t.nav.logout}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t.dashboard.welcome}, {profile.full_name}
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Credit Balance Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t.dashboard.balance}
                            </CardTitle>
                            <Sparkles className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{profile.credits}</div>
                            <div className="mt-4">
                                <TopUpModal />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>{t.dashboard.quickActions}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-3">
                            <Link href="/builder">
                                <Button className="w-full" variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    {t.dashboard.createCV}
                                </Button>
                            </Link>
                            <Link href="/cover-letter">
                                <Button className="w-full" variant="outline">
                                    <FileText className="mr-2 h-4 w-4" />
                                    {t.dashboard.generateCoverLetter}
                                </Button>
                            </Link>
                            <Link href="/linkedin-audit">
                                <Button className="w-full" variant="outline">
                                    <Search className="mr-2 h-4 w-4" />
                                    {t.dashboard.auditProfile}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        {t.dashboard.recentTransactions}
                    </h3>
                    <TransactionHistory initialTransactions={transactions} />
                </div>
            </main>
        </div>
    )
}

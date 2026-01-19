import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DevelopmentOverviewCard } from './DevelopmentOverviewCard';
import { DevelopmentEntryCard } from './DevelopmentEntryCard';
import { mockDevelopmentEntries } from '@/data/mockDevelopmentData';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';

export const MobilePlayerView = () => {
  // Filter out coach-only entries for player view
  const visibleEntries = mockDevelopmentEntries.filter(
    (entry) => entry.visibility === 'player-parent'
  );
  const latestEntry = visibleEntries[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 to-primary/5 border-b">
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-foreground">My Development</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your cricket journey
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Progress Summary */}
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background border-emerald-200 dark:border-emerald-900">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                  Great Progress!
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  4 out of 5 skills are improving
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Overview - Compact */}
        <DevelopmentOverviewCard compact />

        {/* Last Evaluation */}
        {latestEntry && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Last Evaluation</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {format(new Date(latestEntry.date), 'MMM d')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {latestEntry.subcategory} with {latestEntry.coachName}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Timeline Feed */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Development History
          </h2>
          <div className="space-y-4">
            {visibleEntries.map((entry) => (
              <DevelopmentEntryCard key={entry.id} entry={entry} isCoachView={false} />
            ))}
          </div>
        </div>

        {/* Encouragement Footer */}
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="py-6 text-center">
            <p className="text-sm text-muted-foreground">
              🏏 Keep practicing! Your coaches are invested in your growth.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

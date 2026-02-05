import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DevelopmentOverviewCard } from './DevelopmentOverviewCard';
import { DevelopmentEntryCard } from './DevelopmentEntryCard';
import { mockDevelopmentEntries } from '@/data/mockDevelopmentData';
import { format } from 'date-fns';
import { TrendingUp, Calendar, Target } from 'lucide-react';

export const MobilePlayerView = () => {
  // Filter out coach-only entries for player view
  const visibleEntries = mockDevelopmentEntries.filter(
    (entry) => entry.visibility === 'player-parent'
  );
  const latestEntry = visibleEntries[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header - Clean and minimal */}
      <header className="bg-background border-b">
        <div className="px-5 py-5">
          <h1 className="text-lg font-semibold text-foreground">My Development</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your cricket journey
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 py-5 space-y-5">
        {/* Progress Summary - Clean card */}
        <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="py-4 px-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Great Progress!
                </p>
                <p className="text-sm text-muted-foreground">
                  4 out of 5 skills are improving
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-xl border">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{visibleEntries.length}</p>
                  <p className="text-xs text-muted-foreground">Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl border">
            <CardContent className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">4.0</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Overview - Compact */}
        <DevelopmentOverviewCard compact />

        {/* Last Evaluation */}
        {latestEntry && (
          <Card className="rounded-xl border">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Last Evaluation</CardTitle>
                <Badge variant="secondary" className="text-xs font-normal">
                  {format(new Date(latestEntry.date), 'MMM d')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-sm font-medium text-foreground">
                {latestEntry.subcategory}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                with {latestEntry.coachName}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Timeline Feed */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">
            Development History
          </h2>
          <div className="space-y-4">
            {visibleEntries.map((entry) => (
              <DevelopmentEntryCard key={entry.id} entry={entry} isCoachView={false} />
            ))}
          </div>
        </div>

        {/* Encouragement Footer - Subtle */}
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">
            🏏 Keep practicing! Your coaches are invested in your growth.
          </p>
        </div>
      </main>
    </div>
  );
};

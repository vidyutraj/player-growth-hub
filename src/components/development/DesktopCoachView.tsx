import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DevelopmentOverviewCard } from './DevelopmentOverviewCard';
import { DevelopmentEntryCard } from './DevelopmentEntryCard';
import { AddDevelopmentModal } from './AddDevelopmentModal';
import { mockDevelopmentEntries } from '@/data/mockDevelopmentData';

export const DesktopCoachView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Development</h1>
              <p className="text-sm text-muted-foreground">Coaching feedback & player growth</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Development Entry
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overview Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <DevelopmentOverviewCard />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border p-4 text-center">
                <p className="text-3xl font-bold text-primary">{mockDevelopmentEntries.length}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
              <div className="bg-card rounded-lg border p-4 text-center">
                <p className="text-3xl font-bold text-emerald-500">4</p>
                <p className="text-xs text-muted-foreground">Skills Improving</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">Development Timeline</h2>
              <p className="text-sm text-muted-foreground">
                {mockDevelopmentEntries.length} entries
              </p>
            </div>
            <div className="space-y-4">
              {mockDevelopmentEntries.map((entry) => (
                <DevelopmentEntryCard key={entry.id} entry={entry} isCoachView />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Entry Modal */}
      <AddDevelopmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

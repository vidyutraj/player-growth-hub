import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { DevelopmentOverviewCard } from './DevelopmentOverviewCard';
import { DevelopmentEntryCard } from './DevelopmentEntryCard';
import { AddDevelopmentModal } from './AddDevelopmentModal';
import { mockDevelopmentEntries } from '@/data/mockDevelopmentData';

export const DesktopCoachView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Clean minimal style matching Waresport */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Development</h1>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>
        
        {/* Tab Navigation - Matching Waresport style */}
        <div className="px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabsTrigger 
                value="overview" 
                className="bg-transparent px-0 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="sessions" 
                className="bg-transparent px-0 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                Sessions
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="bg-transparent px-0 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium"
              >
                Feedback
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Overview Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <DevelopmentOverviewCard />
            
            {/* Quick Stats - Clean Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border p-5">
                <p className="text-3xl font-bold text-foreground">{mockDevelopmentEntries.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Entries</p>
              </div>
              <div className="bg-card rounded-xl border p-5">
                <p className="text-3xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground mt-1">Skills Improving</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Development Timeline</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {mockDevelopmentEntries.length} entries
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-9 w-9"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-9 w-9"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
              : 'space-y-4'
            }>
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

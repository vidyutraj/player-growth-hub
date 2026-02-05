import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesktopCoachView } from '@/components/development/DesktopCoachView';
import { MobilePlayerView } from '@/components/development/MobilePlayerView';
import { Monitor, Smartphone } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'coach' | 'player'>('coach');

  return (
    <div className="min-h-screen bg-background">
      {/* View Switcher - Demo Only */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as 'coach' | 'player')}>
          <TabsList className="shadow-lg bg-card border">
            <TabsTrigger value="coach" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Monitor className="h-4 w-4" />
              Coach View
            </TabsTrigger>
            <TabsTrigger value="player" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Smartphone className="h-4 w-4" />
              Player View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Views */}
      {activeView === 'coach' ? <DesktopCoachView /> : <MobilePlayerView />}
    </div>
  );
};

export default Index;

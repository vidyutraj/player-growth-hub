import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillRadarChart } from './SkillRadarChart';
import { SkillProgressBars } from './SkillProgressBars';
import { TrendSparklines } from './TrendSparklines';
import { TrendingUp } from 'lucide-react';

interface DevelopmentOverviewCardProps {
  compact?: boolean;
}

export const DevelopmentOverviewCard = ({ compact = false }: DevelopmentOverviewCardProps) => {
  if (compact) {
    return (
      <Card className="rounded-xl border">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Skills Overview</CardTitle>
            <div className="flex items-center gap-1.5 text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Improving</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <SkillRadarChart compact />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-base font-semibold">Skills Overview</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-9 bg-muted/50 rounded-lg">
            <TabsTrigger value="radar" className="text-xs rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Radar
            </TabsTrigger>
            <TabsTrigger value="bars" className="text-xs rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Levels
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Trends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="radar" className="mt-4">
            <SkillRadarChart />
          </TabsContent>
          <TabsContent value="bars" className="mt-4">
            <SkillProgressBars />
          </TabsContent>
          <TabsContent value="trends" className="mt-4">
            <TrendSparklines />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
